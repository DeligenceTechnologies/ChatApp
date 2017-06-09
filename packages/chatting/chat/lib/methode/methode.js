import {Conversation} from '../../../imports/collections/Conversation.js';
import {Online} from '../../../imports/collections/Online.js';
import {Images} from '../../../imports/collections/Images.js';

if(Meteor.isServer){

    Meteor.methods({
/*----------- Send Chat Message-------------*/

    	send_Message: function(data) {
            try{
        	   Conversation.insert(data)
               return true;
            }catch(e){
                console.log("error in send_Message => ",e)
                return false;
            }
    	},


/*----------- Edit Chat Message-------------*/

        editMessage: function(id,message) {
            try{
                Conversation.update({_id:id},{
                    $set:{
                        message:message
                    }
                });
               return true;
            }catch(e){
                console.log("error in send_Message => ",e)
                return false;
            }
        },




/*------------- Seen Message  -------------*/        
        messageSeen:function(receiver,sender){
            try{
                Conversation.update({$and: [{receiver: receiver},{sender:sender}]},
                    {
                        $set: {
                            seen: true
                        }
                    },
                    { multi: true }
                );
                return true;
            }catch(e){
                console.log("error in messageSeen => ",e)
                return false;
            }
        },


/*------------- Show Active User -------------*/
        active:function(id){
            try{
                Online.insert({user: id});
                return true;
            }catch(e){
                console.log("error in active => ",e)
                return false;
            }
        },

        
/*------------- Show Inactive User -------------*/
        inactive:function(id,date){
            try{
                Meteor.users.update({_id:id},{$set:
                    {
                        'profile.lastLogin': date
                    }
                });
                Online.remove({user: id});
                return true;
            }catch(e){
                console.log("error in inactive => ",e)
                return false;
            }
        },



/*------------- Enable enter for send -------------*/
        enableEnter:function(id){
            try{
                let user = Meteor.users.findOne(id);
                if(user.profile.enableEnter){
                    Meteor.users.update({_id:id},{
                        $set:{
                            'profile.enableEnter':false
                        }
                    });
                }else{
                    Meteor.users.update({_id:id},{
                        $set:{
                            'profile.enableEnter':true
                        }
                    });
                }
                
                return true;
            }catch(e){
                console.log("error in active => ",e)
                return false;
            }
        },

    })

}