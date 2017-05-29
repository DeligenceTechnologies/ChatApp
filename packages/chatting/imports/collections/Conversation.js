import { Mongo } from 'meteor/mongo';

export const Conversation = new Mongo.Collection('conversation');

Conversation.allow({
  	insert: function(userId, doc) {
    	// only allow posting if you are logged in
    	return !!userId;
  	},
  	update: function(userId, doc) {
    	// only allow editing if you are logged in
    	return !!userId;
  	}
});