import React from 'react';
import {mount} from 'react-mounter';
import Login from '../imports/ui/Login';
import ResetPassword from '../imports/ui/ResetPassword';
import Tutorial from '../imports/ui/Tutorial';
import Register from '../imports/ui/Register';
import Header from '../imports/ui/Header';


var appRoute = FlowRouter.group({
	name: 'appRoute',
	subscriptions: function(params) {
		this.register('user', Meteor.subscribe('user',Meteor.userId()));
	},
	triggersEnter: [function(context, redirect) {
		if(!Meteor.userId()){
			redirect('home');
		}
	}]
});

FlowRouter.route('/resetPassword', {
    name: 'resetPassword',
    action() {
      mount(ResetPassword);
    }
})

FlowRouter.route('/', {
	name: 'home',
	action() {
		mount(Login);
	}
});

FlowRouter.route('/register', {
    name: 'register',
    action() {
      mount(Register);
    }
})

appRoute.route('/tutorial', {
	name: 'tutorial',
	action() {
		mount(Header, {content: <Tutorial />});
	}
});

appRoute.route('/conversation', {
	name: 'ConversationLayout',
	action() {
		mount(Header, {content: <Home />});

	}
});

appRoute.route('/conversation/:id', {
	name: 'Conversation',
	action(params) {
		mount(Header, {content: <Home id={params.id} />});
	}
});




if(Meteor.isClient){
	Accounts.onLogin(function(){
		if(FlowRouter.current().path == "/"){
			FlowRouter.go('tutorial');
		}else{}
	});
	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}