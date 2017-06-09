import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

/* Register Page */

export default class Register extends Component{
	Signup(event){
		event.preventDefault();
		let data = {
			email: this.refs.email.value,
			password: this.refs.password.value,
			profile:{
				name: this.refs.name.value
			}
		};
		if(this.refs.cPassword.value != this.refs.password.value){
			Bert.alert({
				hideDelay: 3500,
				title: 'WARNING',
			  	message: 'Password is not match',
			  	type: 'warning-msg',
			  	style: 'growl-top-right',
			  	icon: 'fa-exclamation-triangle '
			});
		}else{
			Meteor.call('checkUser',data.email,(err,res)=>{
				if(err || !res ){
					// Bert.alert("Email/Password is incorrect ","danger", "growl-top-right");
					Bert.alert({
						hideDelay: 3500,
						title: 'WARNING',
					  	message: 'User Already Exists',
					  	type: 'warning-msg',
					  	style: 'growl-top-right',
					  	icon: 'fa-exclamation-triangle '
					});
				}else{
					Accounts.createUser(data, (err)=>{
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
							Bert.alert({
								hideDelay: 3500,
								title: 'SUCCESS',
							  	message: 'You have registered, Lets Chat!!! ',
							  	type: 'success-msg',
							  	style: 'growl-top-right',
							  	icon: 'fa-exclamation-triangle '
							});
							FlowRouter.go('home');
						}
					});
				}
			}) 
		}
	}
	render(){
		return(
			<section className="login-wrap">
       			<div className="container">
         			<div className="loginForm">
 						<div className="login-header">
 							<h1> Register Now, <strong>Its time to chat</strong> </h1>
 						</div>
 						<form onSubmit={this.Signup.bind(this)}>
 							<div className="group">
						   		<input type="text" className="used" ref="name" required />
						   		<span className="highlight"></span>
						   		<label>Name</label>
						  	</div>
						  	<div className="group">
						   		<input type="email" className="used" ref="email" required />
						   		<span className="highlight"></span>
						   		<label>Email Id</label>
						  	</div>
						  	<div className="group">
						   		<input type="password" className="used" ref="password" required/>
						   		<span className="highlight"></span>
						   		<label>Password</label>
						  	</div>
						  	<div className="group">
						   		<input type="password" className="used" ref="cPassword" required/>
						   		<span className="highlight"></span>
						   		<label>Confirm Password</label>
						  	</div>
						  	<div className="row">
							  	<button type="submit" className="buttonui col-sm-5"> <span> Register </span> </button>
							  	<div className="col-sm-2"></div>
							  	<a href="/" className="buttonui col-sm-5"> <span> Cancel </span> </a>
						  	</div>
						</form>
							
					</div>
				</div> 
			</section>
		);
	}
}