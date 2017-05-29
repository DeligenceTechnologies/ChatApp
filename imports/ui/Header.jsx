import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

/* Home Page */

export default class Header extends Component{
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
		console.log(this.props.content)
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


				<header className="header">
			      	<div className="container">
			        	<div className="pull-left">
			        		<div className="logo">
			        			<img src="/images/logo.png" />
			        		</div>
			        	</div>
			        	<div className="pull-right">
			           		<div className="navigation">
				             	<ul>
				                 	<li onClick={(()=>this.headerPage('conversation'))} id="conversation" >
										<a className="headerTab" style={{'outline': 'medium none'}}>Chat</a>
									</li>
									
									<li onClick={(()=>this.headerPage('profile'))} id="profile" >
										<a className="headerTab" style={{'outline': 'medium none'}}>Profile</a>
									</li>
									
									<li onClick={(()=>this.logoutUser())} className="">
										<a className="headerTab" style={{'outline': 'medium none'}}>Logout</a>
									</li>
				             	</ul>
			           		</div>
			         	</div>
			      	</div>
			    </header>


			    {this.props.content}
			</div>
		);
	}
}