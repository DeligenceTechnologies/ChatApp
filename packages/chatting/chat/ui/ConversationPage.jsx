/*------------------- Conversation Page ------------------------*/
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import Member from './Member.jsx';
import FatchConversation from './FatchConversation.jsx';
import MembersList from './MembersList.jsx';

import {Online} from '../../imports/collections/Online.js';
import {Images} from '../../imports/collections/Images.js';
import {Conversation} from '../../imports/collections/Conversation.js';
// import {DefaultData} from '../../imports/collections/DefaultData.js';

class ConversationPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message:'no message',
            id:'',
        };
    }
    componentDidMount(){
        require('../../imports/Style/chatStyle.css');
        require('../../imports/js/jquery-1.12.4.min.js');

        let link1 = document.createElement('link');
        link1.id = 'id1';
        link1.rel = 'hortcut icon';
        link1.type="image/x-icon";
        link1.href = "";
        document.getElementsByTagName('head')[0].appendChild(link1);

        let link2 = document.createElement('link');
        link2.id = 'id2';
        link2.rel = 'icon';
        link2.type="image/x-icon";
        document.getElementsByTagName('head')[0].appendChild(link2);

        let link3 = document.createElement('link');
        link3.id = 'id3';
        link3.rel = 'stylesheet';
        link3.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
        document.getElementsByTagName('head')[0].appendChild(link3);

        let link4 = document.createElement('link');
        link4.id = 'id4';
        link4.rel = 'stylesheet';
        link4.type="text/css";
        link4.href = "https://fonts.googleapis.com/css?family=Poppins:400,300,500,600,700";
        document.getElementsByTagName('head')[0].appendChild(link4);

        let link5 = document.createElement('link');
        link5.id = 'id5';
        link5.rel = 'stylesheet';
        link5.href = "https://fonts.googleapis.com/css?family=Hind+Madurai:300,400,500,600,700";
        document.getElementsByTagName('head')[0].appendChild(link5);

         let link6 = document.createElement('link');
        link6.id = 'id6';
        link6.rel = 'stylesheet';
        link6.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
        document.getElementsByTagName('head')[0].appendChild(link6);


        let meta1 = document.createElement('meta');
        meta1.httpEquiv = "Content-Type";
        meta1.content = "text/html; charset=utf-8";
        document.getElementsByTagName('head')[0].appendChild(meta1);

        let meta2 = document.createElement('meta');
        meta2.name = "viewport";
        meta2.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
        document.getElementsByTagName('head')[0].appendChild(meta2);

        let meta3 = document.createElement('meta');
        meta3.httpEquiv = "X-UA-Compatible";
        meta3.content = "IE=edge";
        document.getElementsByTagName('head')[0].appendChild(meta3);      

        let script1 = document.createElement('script');
        script1.type = 'text/javascript';
        script1.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js';
        document.getElementsByTagName('head')[0].appendChild(script1);
    }
    checkConversation(){
        if(this.props.receiver && this.props.receiver._id){
            return (
                <div className="row reply">
                    <form role="form" onSubmit={this.submit_chat.bind(this)}>
                        <div className="col-sm-11 col-xs-11 reply-main">
                            <input type='text' key={this.state.message} placeholder="Your message here!" rows="1" id="messageBox" className="form-control" defaultValue={this.state.message!='no message'?this.state.message:''} required />
                        </div>
                        <div className="col-sm-1 col-xs-1 reply-send">
                            <button className="send-btn" id="send-message" type="submit">
                                <i className="fa fa-send" aria-hidden="true"></i>
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    }
    back(){
        $('.side').removeClass('conv-mobile');
        $('.conversation').addClass('conv-mobile')
    }
    checkOnline(receiver){
        if(Online.find({user: receiver._id}).count() != 0){
            return (
                <span className="heading-online">Online</span>
            )
        }else{
            let lastLoginTime = '';
            if(receiver.profile.lastLogin){
                let currentDate = new Date();
                let delta = Math.abs(currentDate - new Date(receiver.profile.lastLogin)) / 1000;
                let days = Math.floor(delta / 86400);
                let hours = Math.floor(delta / 3600) % 24;
                let minutes = Math.floor(delta / 60);
                let seconds = Math.floor(delta % 60);
                if(days != 0 ){
                    if(days == 1){
                        lastLoginTime = 'last seen yesterday at '+receiver.profile.lastLogin.toString().substring(16,21);
                    }else{
                        lastLoginTime = 'last seen '+receiver.profile.lastLogin.toString().substring(4,15);
                    }
                }else{
                    lastLoginTime = 'last seen today at '+receiver.profile.lastLogin.toString().substring(16,21);
                }
            }
            if(lastLoginTime != ''){
                return(
                    <span className="heading-online">{lastLoginTime}</span>
                )
            }else{
                return '';
            }
        }
    }
    openModal(){
        $('#myModal').modal('show');
        $('#myModal').css('display','block');
    }
    render() {
        // $(window).scrollTop(0);
        if(this.props.isReady){
            return (
                <section className="app-box">
                    {
                        this.props.users.length != 0 ?
                            <div className="container app">
                                <div className="row app-one">
                                    <div className="col-sm-4 side">
                                        <div className="side-one">
                                            <div className="row heading">
                                                <div className="col-sm-3 col-md-2 col-xs-3 heading-avatar">
                                                    <div className="heading-avatar-icon">
                                                        { 
                                                            this.props.sender && this.props.sender.profile.image && this.props.senderImage ? 
                                                                <img key={this.props.senderImage._id} src={this.props.senderImage.url()} className="img-responsive round" id="memImage" alt={this.props.receiver.profile.name} />
                                                            :
                                                                <i className="fa fa-user" aria-hidden="true"></i>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="col-sm-3 col-xs-3 heading-name">
                                                    <a className="heading-name-meta">
                                                        {this.props.sender?this.props.sender.profile.name:''}
                                                    </a>
                                                </div>
                                                <div className="col-sm-3 col-xs-3 heading-compose pull-right" onClick={()=>{this.openModal()}}>
                                                    <i className="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <Member chat={this.props.chatList} activeUser={this.props.receiver && this.props.receiver._id?this.props.receiver._id:''}/>
                                        </div>
                                    </div>

                                    {
                                        this.props.receiver ?
                                             <div className="col-sm-8 conversation conv-mobile">
                                                <div className="row heading">
                                                    <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar" onClick={()=>{this.back()}}>
                                                        <div className="heading-avatar-icon">
                                                            {
                                                                this.props.receiver && this.props.receiver.profile.image && this.props.userImage ? 
                                                                    <img key={this.props.userImage._id} src={this.props.userImage.url()} className="img-responsive round" id="memImage" alt={this.props.receiver.profile.name} />
                                                                :
                                                                    <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8 col-xs-7 heading-name">
                                                        <a className="heading-name-meta">
                                                            {this.props.receiver?this.props.receiver.profile.name:''}
                                                        </a>
                                                        {this.checkOnline(this.props.receiver)}
                                                    </div>
                                                </div>

                                                {
                                                    this.props.receiver ?
                                                        <FatchConversation receiverID={this.props.receiver ? this.props.receiver._id : ''} />  
                                                    :''
                                                }
                                                    
                                                {this.checkConversation()}
                                            </div>
                                        :
                                            ''
                                    }
                                </div>
                            </div>
                        :
                            <div className="container alert alert-warning" style={{"textAlign":"center"}}><strong>No Users to Display</strong></div>
                    }
                    <div id="myModal" className="modal user-modal">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">User list</h4>
                                </div>
                                <div className="modal-body">
                                    {
                                        this.props.users.length != 0 ?
                                            this.props.users.map((member)=>{
                                                return(
                                                    <MembersList key={ member._id } member = { member } newChat={true} />
                                                )
                                            })
                                        :
                                            ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }else{
            return <div></div>
        }
    }
    submit_chat(event){
        event.preventDefault();
        let data = {
            receiverId:this.props.receiver._id,
            senderId: Meteor.userId(),
            message: $('#messageBox').val(),
            time: new Date(),
            seen:false,
            remove:false
        }
        if(data.message != ""){
            Meteor.call("send_Message", data,function(err){
                if(err){
                    Bert.alert({
                        hideDelay: 3500,
                        title: 'WARNING',
                        message: 'Message not sent',
                        type: 'warning-msg',
                        style: 'growl-top-right',
                    })  
                }else{
                    $('#messageBox').val('');
                }
            });
            
        }else{
            $('#messageBox').val('');
            document.getElementById('messageBox').focus();
        }
    }
}

export default createContainer((data) => {
    let handle = Meteor.subscribe("Members");
    let handle2 = Meteor.subscribe("Chat");
    Meteor.subscribe("MyImage");
    let sender = Meteor.users.findOne({_id:Meteor.userId()});
    let user = [];
    let chat = Conversation.find({$or:[{senderId:Meteor.userId()},{receiverId: Meteor.userId()}], remove:false},{sort:{time:-1}}).fetch();
    // console.log("chat ==>>", chat)
    if(data.uid!=''){
        user = Meteor.users.find({_id: data.uid}).fetch();    
    }else if(chat.length!=0){
        if(chat[0].senderId != Meteor.userId()){
            if(Meteor.users.find({_id:chat[0].senderId}).count()!=0){
                user = Meteor.users.find({_id:chat[0].senderId}).fetch();
            }
        }else if(Meteor.users.find({_id:chat[0].receiverId}).count()!=0){
            user = Meteor.users.find({_id:chat[0].receiverId}).fetch();
        }
    }
    let chatList =[];
    for(let i in chat){
        if(chat[i].senderId != Meteor.userId()){
            if(Meteor.users.find({_id:chat[i].senderId}).count()!=0){
                chatList.push(Meteor.users.findOne({_id:chat[i].senderId}));
            }
        }else if(Meteor.users.find({_id:chat[i].receiverId}).count()!=0){
            chatList.push(Meteor.users.findOne({_id:chat[i].receiverId}));
        }
    }
    // console.log("===", chatList)
    let filter = _.pluck(chatList,"_id");
    // console.log("filter ===>>>>", filter)
    let list = [];
    if(filter.length!=0){
        for(let i in filter){
            if(list.indexOf(filter[i]) < 0){
                list.push(filter[i]);
            }
        }
    }
    let userList = [];
    if(list.length!=0){
        for(let i in list){
            userList.push(Meteor.users.findOne(list[i]));
        }
    }
    // console.log("user ==>>", user)
    let receiverId = user.length!=0?user[0]._id:null;
    return {
        isReady: handle.ready(),
        userImage: user.length!=0?Images.findOne({_id: user[0].profile.image}):null,
        senderImage: sender?Images.findOne({_id:sender.profile.image}):null,
        receiver: user.length!=0 && user[0]._id != Meteor.userId()?Meteor.users.findOne({_id: user[0]._id}):null,
        sender: sender?sender:null,
        chatList: userList.length!=0?userList:[],
        users: Meteor.users.find({"_id":{$ne:Meteor.userId()}}).fetch()
    }
},ConversationPage);