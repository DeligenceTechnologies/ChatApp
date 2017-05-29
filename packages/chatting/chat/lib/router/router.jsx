import React from 'react';
import {mount} from 'react-mounter';

import ConversationPage from '../../../chat/ui/ConversationPage.jsx';




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



// appRoute.route('/conversation', {
// 	name: 'ConversationLayout',
// 	action() {
// 		ReactLayout.render(Home, {content: <ConversationPage />});
// 	}
// });

// appRoute.route('/conversation/:id', {
// 	name: 'Conversation',
// 	action(params) {
// 		ReactLayout.render(Home, {content: <ConversationPage uid={params.id}/>});
// 	}
// });

