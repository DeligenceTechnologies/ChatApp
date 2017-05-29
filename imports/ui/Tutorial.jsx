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
		// $(window).load(function(){
		//   $(".preloader-bg").fadeOut('slow');
		//   $('body').delay(350).css({'overflow':'visible'});
		// });
	}
	render(){
		return(
			<div className="wrapper">

				{/*<div className="preloader-bg">
			        <div className="preloader_inner">
			            <div className="thecube">
			              <div className="cube c1"></div>
			              <div className="cube c2"></div>
			              <div className="cube c4"></div>
			              <div className="cube c3"></div>
			            </div>
			        </div>
			    </div>*/}


				
			</div>
		);
	}
}