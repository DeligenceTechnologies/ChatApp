import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import MembersList from './MembersList.jsx';

class Member extends Component{
    startChat(e){
        // FlowRouter.go('Conversation',{id:e.target.attributes['data-id'].nodeValue})
    }
	render() {
        // console.log("==>>", this.props.chat.length)
        return(
            <div className="row sideBar">
                {
                    this.props.chat.length != 0 ?
                        this.props.chat.map((member)=>{
                            return(
                                <MembersList key={ member._id } member = { member } newChat={false} />
                            )
                        })
                    :
                        ''
                }
            </div>
        )
	}
}
export default createContainer((data) => {
    let handle = Meteor.subscribe("Members")
    Meteor.subscribe("Chat");
    return{
        isReady: handle.ready(),
        currnetUSer: Meteor.user(),
        users: Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch(),
        active: Meteor.users.findOne({_id:data.activeUser})
    }
},Member);