import React, { Component } from 'react';
// import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import ConversationPage from './ConversationPage.jsx';

var createReactClass = require('create-react-class');

/* Home Page */

Home = createReactClass({
	componentDidMount(){

        require('../../imports/js/jquery-1.12.4.min.js');
		// $(window).load(function(){
		//   $(".preloader-bg").fadeOut('slow');
		//   $('body').delay(350).css({'overflow':'visible'});
		// });
	},
	render(){
		return(
				<ConversationPage uid={this.props.id?this.props.id:''} />
				
			
		);
	}
});