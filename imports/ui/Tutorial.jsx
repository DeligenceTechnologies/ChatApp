import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

/* Home Page */

export default class Tutorial extends Component{
	headerPage(value){
		$('#'+value).addClass('headerActive').siblings().removeClass('headerActive');
		FlowRouter.go('/'+value)
	}
	logoutUser(){
		Meteor.call('inactive',Meteor.userId(), new Date(), (err,res)=>{
			if(err || !res){
			}else{
				Meteor.logout();
				FlowRouter.go('home');
			}
		})
	}
	componentDidMount(){
		require('../js/jquery-1.12.4.min.js');
	}
	render(){
		return(
			<div className="wrapper">				
			</div>
		);
	}
}