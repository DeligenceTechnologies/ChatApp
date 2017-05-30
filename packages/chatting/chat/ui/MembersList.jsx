import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import {Online} from '../../imports/collections/Online.js';
import {Images} from '../../imports/collections/Images.js';
import {Conversation} from '../../imports/collections/Conversation.js';
import {DefaultData} from '../../imports/collections/DefaultData.js';

class MembersList extends Component{
	startChat(id){
	  	Meteor.call("messageSeen",Meteor.userId(),id);
	  	
	  	$('.side').addClass('conv-mobile');
	  	$('.conversation').removeClass('conv-mobile')
	  	if(this.props.newChat){
	  		$('#myModal').modal('hide');
        	$('#myModal').css('display','none');
	  	}
	  	FlowRouter.go('Conversation',{id:id});
	  	//FlowRouter.setParams({id:e.target.attributes['data-id'].nodeValue});
	}
	checkOnline(member){
		if(Online.find({user: member._id}).count() != 0){
	  		return (
	    		<span className="online-status pull-left"><i className="fa fa-circle"></i> online</span>
	  		)
	  	}else{
	  		let lastLoginTime = '';
	  		if(member.profile.lastLogin){
		  		let currentDate = new Date();
				let delta = Math.abs(currentDate - new Date(member.profile.lastLogin)) / 1000;
				let days = Math.floor(delta / 86400);
				let hours = Math.floor(delta / 3600) % 24;
			    let minutes = Math.floor(delta / 60);
				let seconds = Math.floor(delta % 60);
				if(days != 0 ){
					if(days == 1){
						lastLoginTime = 'left at '+member.profile.lastLogin.toString().substring(16,21);
					}else{
						lastLoginTime = 'left seen '+member.profile.lastLogin.toString().substring(4,15);
					}
				}else{
					lastLoginTime = 'left today at '+member.profile.lastLogin.toString().substring(16,21);
				}
			}
			if(lastLoginTime != ''){
				return(
					<span className="offline-status"><i className="fa fa-circle"></i>  {lastLoginTime}</span>
				)
			}else{
				return '';
			}
	  	}
	}
	lastMessageDisplay(){
		if(Conversation.find({$or: [{senderId: Meteor.userId(), receiverId: this.props.member._id},{senderId: this.props.member._id, receiverId: Meteor.userId()}], remove: { $exists: true, $eq:false}}).count() != 0 ){
			let lastMessage = Conversation.findOne({$or: [{senderId: Meteor.userId(), receiverId: this.props.member._id},{senderId: this.props.member._id, receiverId: Meteor.userId()}], remove: { $exists: true, $eq:false}},{sort:{time: -1},limit: 1});
			let messsageShow = "";
			if (lastMessage.message.length > 25)
	  			messsageShow = lastMessage.message.substring(0,25)+'...';
	  		else
	  			messsageShow = lastMessage.message;
			
			let date = new Date(lastMessage.time);
				
			return(
				<p className="pull-right">
					{lastMessage.senderId == Meteor.userId() ? "YOU:  " + messsageShow : messsageShow}
				</p>
			)
		}else{
			return '';
		}
	}
	render(){
	  	return(
	   		
    		<div className="row sideBar-body" key={this.props.member._id} onClick={()=>{this.startChat(this.props.member._id)}}>
      			<div className="col-sm-2 col-xs-2 sideBar-avatar">
        			<div className="avatar-icon">

        				{ 
		      				this.props.member.profile.image ? 
		        				this.props.images.map((img)=>{
			          				return (
			            				<img data-id={this.props.member._id} key={img._id} src={img.url()} className=" pull-left round" id="memImage" alt={this.props.member.profile.name} data-id={this.props.member._id} />
			          				)
		        				})
		        			:
		              			<span><i className="fa fa-user" aria-hidden="true"></i></span>
		      			}
		      		</div>
		      	</div>
		        <div className="col-sm-10 col-xs-10 sideBar-main">
	                <div className="row">
	                	<div className="col-sm-8 col-xs-8 sideBar-name">
	                    	<span className="name-meta">
	                    		{this.props.member.profile.name}
	                    	</span>
	                    	
		                    	
	                    </div>
		            </div>
		            {
                		!this.props.newChat?
                			this.checkOnline(this.props.member)
                		:
                			''
                	}
		            {
                		!this.props.newChat?
            				this.lastMessageDisplay()
            			:
            				''
                	}
		        </div>
		    </div>
	  	)
	}
}

export default createContainer((data) => {
  	let handle = Meteor.subscribe("MyImage");
  	Meteor.subscribe("OnlineUser");
  	Meteor.subscribe('conversation',Meteor.userId(),data.member._id);
  	let user = Meteor.users.find({_id:data.member._id}).fetch();
  	return {
  		isReady: handle.ready(),
  		images: user && data.member.profile.image?Images.find({_id:data.member.profile.image}).fetch():[],
  		online: Online.find().fetch()
  	}
},MembersList);