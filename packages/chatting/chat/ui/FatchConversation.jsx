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

    openDropDown(index){
        if($('#action'+index).hasClass('open'))
            $('#action'+index).removeClass('open')
        else
            $('#action'+index).addClass('open');
    }
    edit(id){
        this.props.editMessage(id);
    }
    remove(id){
        message = 'This message has been removed.';
        Meteor.call('removeMessage', id, message, (err,res)=>{
            if(err || !res){
                Bert.alert({
                    hideDelay: 3500,
                    title: 'WARNING',
                    message: 'Message not remove',
                    type: 'warning-msg',
                    style: 'growl-top-right',
                }) 
            }
        })
    }
 	render(){
      	return (
            <div className="row message" id="conversation" key={this.props.isReady}>
          	    {/*<div className="row message-previous">
                    <div className="col-sm-12 previous">
                        <a href="#" id={this.props.receiverID} name="20">
                            Show Previous Message!
                        </a>
                    </div>
                </div>*/}
          	    {
      		        this.props.chat.map((message,index)=>{
      			        let date = new Date(message.time)
              			return( 

                            <div key={message._id} className="row message-body">
                                <div className={ message.senderId != this.props.sender._id?"col-sm-12 message-main-receiver":"col-sm-12 message-main-sender"}>
                                    <div className={message.senderId != this.props.sender._id?"receiver":"sender"}>
                                        {
                                            message.senderId == this.props.sender._id && index == this.props.chat.length -1 && !message.remove?
                                                <div className="col-sm-1 col-xs-1  heading-dot pull-right">
                                                    <div className="dropdown" id={"action"+index}>
                                                        <button className="send-btn dropdown-toggle" type="button" id={"dropdownMenu"+index} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>{this.openDropDown(index)}}> 
                                                            <i className="glyphicon glyphicon-triangle-bottom  pull-right" aria-hidden="true"></i>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby={"dropdownMenu"+index}>
                                                            <li onClick={()=>{this.edit(message._id)}}>
                                                                <a href="#">
                                                                    Edit
                                                                </a>
                                                            </li>
                                                            <li onClick={()=>{this.remove(message._id)}}>
                                                                <a href="#">
                                                                    Remove
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            :
                                                ''
                                        }
                                        <div className="message-text">
                                            {
                                                message.message == 'This message has been removed.'?
                                                    <i className="fa fa-trash" aria-hidden="true">&nbsp;&nbsp;</i>
                                                :
                                                    ''
                                            }
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