import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

/* Home Page */

export default class Login extends Component{
	Signin(event){
		event.preventDefault();
		let email = this.refs.email.value;
		let password = this.refs.password.value;
		Meteor.loginWithPassword(email, password, (err)=>{
			if(err){
				// Bert.alert("Email/Password is incorrect ","danger", "growl-top-right");
				console.log(err)
				Bert.alert({
					hideDelay: 3500,
					title: 'WARNING',
				  	message: 'Email/Password is incorrect',
				  	type: 'warning-msg',
				  	style: 'growl-top-right',
				  	icon: 'fa-exclamation-triangle '
				});
			}else{
				Meteor.call('active',Meteor.userId());
				FlowRouter.go('tutorial');
			}
		});
		
	}
	render(){
		return(
			<section className="login-wrap">
       			<div className="container">
         			<div className="loginForm">
 						<div className="login-header">
 							<h1> Please Login, <strong>Its time to chat</strong> </h1>
 						</div>
 						<form onSubmit={this.Signin.bind(this)}>
						  	<div className="group">
						   		<input type="email" className="used" ref="email" required />
						   		<span className="highlight"></span>
						   		<label>Username</label>
						  	</div>
						  	<div className="group">
						   		<input type="password" className="used" ref="password" required/>
						   		<span className="highlight"></span>
						   		<label>Password</label>
						  	</div>
						  	<button type="submit" className="buttonui "> <span> LOGIN </span> </button>
						  	<br/>
						  	<div>
						  		<a href="/resetPassword" className="reset-btn pull-right">Forgotten Password?</a>
								<a href="/register" className="reset-btn pull-left">Register</a>
						  	</div>
						</form>
							
					</div>
				</div> 
			</section>
		);
	}
}