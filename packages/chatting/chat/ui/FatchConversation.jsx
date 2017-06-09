/*------------------------ fetch Conversation -----------------------*/

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import Member from './Member.jsx';

import {Online} from '../../imports/collections/Online.js';
import {Images} from '../../imports/collections/Images.js';
import {Conversation} from '../../imports/collections/Conversation.js';
import {DefaultData} from '../../imports/collections/DefaultData.js';

class FatchConversation extends Component{
	componentDidUpdate(){ 
 		//  $("#lastMessage").scrollBottom($("#lastMessage")[0].scrollHeight);
 		//  $('#lastMessage')[0].scrollIntoView();
        let chatContainer = $('.row .message');
        chatContainer.animate({ scrollTop: chatContainer[0].scrollHeight}, 1000);
        Meteor.call("messageSeen",Meteor.userId(),this.props.receiverID);
	}
 	render(){
      	return (
            <div className="row message" id="conversation" key={this.props.isReady}>
          	    {
      		        this.props.chat.map((message,index)=>{
      			        let date = new Date(message.time)
              			return(
                            <div key={message._id} className="row message-body">
                                <div className={ message.senderId != this.props.sender._id?"col-sm-12 message-main-receiver":"col-sm-12 message-main-sender"}>
                                    <div className={message.senderId != this.props.sender._id?"receiver":"sender"}>
                                        <div className="message-text">
                                            {message.message}
                                        </div>
                                        <span className="message-time pull-right">
                                            {date.toString().substring(4,21)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
              		})
                }
            </div>
      	);
    }
}

export default createContainer((data) => {
    let handle1 = Meteor.subscribe('conversation',Meteor.userId(),data.receiverID);
    let handle2 = Meteor.subscribe("user",data.receiverID);
    let handle3 = Meteor.subscribe("ImageFile");
    let senderUser = Meteor.user();
    let receiverUser = Meteor.users.findOne(data.receiverID);
    return {
        isReady: handle1.ready() && handle2.ready() && handle3.ready(),
        chat: Conversation.find({$or: [{senderId: Meteor.userId(), receiverId: data.receiverID},{senderId: data.receiverID, receiverId: Meteor.userId()}]},{sort:{time: 1}}).fetch(),
        senderImage :senderUser?Images.find({_id: senderUser.profile.image}).fetch():[],
        receiverImage :receiverUser?Images.find({_id: receiverUser.profile.image}).fetch():[],
        sender:Meteor.user(),
        receiver:Meteor.users.findOne(data.receiverID)
    }
},FatchConversation);