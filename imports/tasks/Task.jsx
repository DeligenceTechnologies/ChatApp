Meteor.methods({
	// check user is active or not
    'checkUser':function(email){
        try{
            let user = Meteor.users.findOne({'emails.address': email});
            if(user){
                return false;
            }else{
                return true;
            }
        }catch(e){
            console.log("error in checkUser --> ",e)
            return false;
        }
    },
});