import { Meteor } from 'meteor/meteor';


import {Conversation} from '../imports/collections/Conversation.js';
import {Online} from '../imports/collections/Online.js';
import {Images} from '../imports/collections/Images.js';
import {DefaultData} from '../imports/collections/DefaultData.js';



Meteor.publish('user', function (id) {
    return Meteor.users.find({_id:id});
});

Meteor.publish("Members", function() {
  	return Meteor.users.find();
});

Meteor.publish('conversation', (userId, receiver) => {
  	return Conversation.find({$or: [{senderId: userId, receiverId: receiver},{senderId: receiver, receiverId: userId}]});
});

Meteor.publish("ImageFile", function(){
	return Images.find();
});

Meteor.publish('notification', (userId) => {
 	return Conversation.find({receiver: userId});
});

Meteor.publish("OnlineUser", function(){
	return Online.find();
});

Meteor.publish("Chat", function(){
	return Conversation.find();
});

Meteor.publish("DefaultData", function(){
	return DefaultData.find();
});
