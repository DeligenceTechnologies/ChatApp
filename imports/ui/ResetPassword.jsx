import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

/* Home Page */

export default class ResetPassword extends Component {
	resetPassword(event){
		event.preventDefault();
		let email = this.refs.email.value;
		$('#editClientGif, .imageContainer2').css('display','block');
		Meteor.call('checkUser',email,(err,res)=>{
			if(err || !res ){
				$('#editClientGif, .imageContainer2').css('display','none');
				// Bert.alert(" Email is incorrect ","danger", "growl-top-right");
				Bert.alert({
					hideDelay: 3500,
					title: 'WARNING',
				  	message: 'Email is incorrect',
				  	type: 'warning-msg',
				  	style: 'growl-top-right',
				  	icon: 'fa-exclamation-triangle '
				});
			}else{
				Accounts.forgotPassword({email}, (err)=>{
					if(err){
						$('#editClientGif, .imageContainer2').css('display','none');
						// Bert.alert(" Email is incorrect ","danger", "growl-top-right");
						Bert.alert({
							hideDelay: 3500,
							title: 'WARNING',
						  	message: 'Email is incorrect',
						  	type: 'warning-msg',
						  	style: 'growl-top-right',
						  	icon: 'fa-exclamation-triangle '
						});
					}else{
						$('#lodingGif, .imageContainer').css('display','none');
						Bert.alert({
							hideDelay: 3500,
							title: 'SUCCESS',
						  	message: 'Reset link send to your email address',
						  	type: 'success-msg',
						  	style: 'growl-top-right',
						  	icon: 'fa-check'
						});
						// Bert.alert(" Reset link send to your email address ","info", "growl-top-right");
						FlowRouter.go('/');
					}
				})
			}
		})
	}
	backPage(){
		FlowRouter.go('/');
	}
	render(){
		return(
			<section className="login-wrap">
				<div id="lodingGif" className="imageFade">
					<div className="imageContainer">
						<i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
					</div>
				</div>
       			<div className="container">
         			<div className="loginForm">
 						<div className="login-header">
 							<h1>ChattingApp - Password Reset</h1>
 						</div>
 						<form onSubmit={this.resetPassword.bind(this)}>
 							<div className="group">
						   		<input type="email" className="used" ref="email" required />
						   		<span className="highlight"></span>
						   		<label>Email Id</label>
						  	</div>
						  	<div className="row">
							  	<button type="submit" className="buttonui col-sm-5"> <span> Send </span> </button>
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