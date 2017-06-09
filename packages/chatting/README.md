# ChatApp : Chatting 1.1

Chatting for ChatApp. To install Chatting layout in your ChatApp App, Hit the following command :-

`meteor add deligencetechnologies:chatting`

and add below router in your app 


```javascript
FlowRouter.route('/conversation', {
	name: 'ConversationLayout', 
	action() {
		mount(Header, {content: <Home />});

	}
});

FlowRouter.route('/conversation/:id', {
	name: 'Conversation',
	action(params) {
		mount(Header, {content: <Home id={params.id} />});
	}
});
```


![GitHub Logo](./public/screen-1.png?raw=true "Chatting layout")


![GitHub Logo](./public/screen-2.png?raw=true "All users list")