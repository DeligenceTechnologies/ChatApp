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
import {DefaultData} from '../../imports/collections/DefaultData.js';

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
    componentDidUpdate(){
        if(this.props.sender.profile.enableEnter){
            $("#messageBox").keypress(function (e) {
                if(e.which == 13) {
                    //submit form via ajax, this is not JS but server side scripting so not showing here
                    $('#send-message').click();
                    e.preventDefault();
                }
            });
        }else{
            $("#messageBox").keypress(function (e) {
                if(e.which == 13) {
                    //submit form via ajax, this is not JS but server side scripting so not showing here
                    
                }
            });
        }
    }
    editMessage(id){
        // Session.set('chatId',id);
        
        let message = Conversation.findOne({_id:id});
        this.setState({
            message:message.message,
            chatId:id
        });
    }
    checkConversation(){
        if(this.props.receiver && this.props.receiver._id){
            return (
                <div className="row reply">
                    <form role="form" onSubmit={this.submit_chat.bind(this)}>
                        <div className="col-sm-11 col-xs-11 reply-main" >
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
    openDropDown(){
        $('#action').addClass('open')
    }
    enbaleEnter(){
        Meteor.call('enableEnter', Meteor.userId(), (err,res)=>{
            if(err || !res){
                Bert.alert({
                    hideDelay: 3500,
                    title: 'WARNING',
                    message: 'Setting not save',
                    type: 'warning-msg',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle '
                });
            }else{
                Bert.alert({
                    hideDelay: 3500,
                    title: 'SUCCESS',
                    message: 'Setting Saved',
                    type: 'success-msg',
                    style: 'growl-top-right',
                    icon: 'fa-exclamation-triangle '
                });
            }
        });
    }
    openModal(){
        $('#myModal').modal('show');
        $('#myModal').css('display','block');
    }
    render() {
        $(window).scrollTop(0);
        if(this.props.isReady){
            return (
                <section className="app-box">
                    <div className="container app">
                        <div className="row app-one">

                            <div className="col-sm-4 side">
                                <div className="side-one">
                                    <div className="row heading">
                                        <div className="col-sm-3 col-xs-3 heading-avatar">
                                            <div className="heading-avatar-icon">
                                                { 
                                                    this.props.sender && this.props.sender.profile.image && this.props.senderImage? 
                                                        <img key={this.props.senderImage._id} src={this.props.senderImage.url()} className="img-responsive round" id="memImage" alt={this.props.receiver.profile.name} />
                                                    :
                                                        <i className="fa fa-user" aria-hidden="true"></i>
                                                }
                                            </div>
                                        </div>
                                        {/*<div className="col-sm-1 col-xs-1  heading-dot  pull-right">
                                             <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                                        </div>*/}
                                        <div className="col-sm-3 col-xs-3 heading-compose  pull-right" onClick={()=>{this.openModal()}}>
                                            <i className="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                     


                                   {/* <div className="row searchBox">
                                        <div className="col-sm-12 searchBox-inner">
                                            <div className="form-group has-feedback">
                                                <input id="searchText" type="text" className="form-control" name="searchText" placeholder="Search" />
                                                <span className="glyphicon glyphicon-search form-control-feedback"></span>
                                            </div>
                                        </div>
                                    </div>*/}
                                      
                                    <Member chat={this.props.chatList} activeUser={this.props.receiver && this.props.receiver._id?this.props.receiver._id:''}/>
                                </div>
                            </div>

                            {
                                this.props.receiver?
                                     <div className="col-sm-8 conversation conv-mobile">
                                        <div className="row heading">
                                            <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar" onClick={()=>{this.back()}}>
                                                <div className="heading-avatar-icon">
                                                    { 
                                                        this.props.receiver && this.props.receiver.profile.image && this.props.userImage? 
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
                                            {/*<div className="col-sm-1 col-xs-1  heading-dot pull-right">
                                                <div className="dropdown" id="action">
                                                    <button className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>{this.openDropDown()}}> 
                                                        <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                                                        <li onClick={()=>{this.enbaleEnter()}}>
                                                            <a href="#">
                                                                {
                                                                    this.props.sender.profile.enbaleEnter?
                                                                        'Disable enter as send'
                                                                    :
                                                                        'Enable enter as send'
                                                                }
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>*/}
                                        </div>

                                        <FatchConversation receiverID={this.props.receiver ? this.props.receiver._id : ''} editMessage={this.editMessage.bind(this)} />      
                                        {this.checkConversation()}
                                    </div>
                                :
                                    ''
                            }
                        </div>
                    </div>
                    <div id="myModal" className="modal user-modal">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">User list</h4>
                                </div>
                                <div className="modal-body">
                                    {
                                        this.props.users.length != 0?
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
        if(this.state.message != 'no message' && $('#messageBox').val()!=''){
            Meteor.call('editMessage',this.state.chatId, $('#messageBox').val(), (err,res)=>{
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
            let user = Meteor.users.findOne({_id: Meteor.userId()});
            
            let data = {
              receiverId:this.props.receiver._id,
              senderId: Meteor.userId(),
              message: $('#messageBox').val(),
              time: new Date(),
              seen:false,
              remove:false
            }
            if(data.message != "" ){
                let a = Meteor.users.findOne({_id: this.props.receiver._id});
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
}

export default createContainer((data) => {
    let handle = Meteor.subscribe("Members");
    let handle2 = Meteor.subscribe("Chat")
    Meteor.subscribe("MyImage");
    let sender = Meteor.users.findOne({_id:Meteor.userId()});
    let user = [];
    let chat = Conversation.find({$or:[{senderId:Meteor.userId()},{receiverId: Meteor.userId()}]},{sort:{time:-1}}).fetch();
    if(data.uid!=''){
        user = Meteor.users.find({_id: data.uid}).fetch();
    
    }else if(chat.length!=0  ){
        if(chat[0].senderId != Meteor.userId()){
            user = Meteor.users.find({_id:chat[0].senderId}).fetch();
        }else{
            user = Meteor.users.find({_id:chat[0].receiverId}).fetch();
        }
    }else{
        user = Meteor.users.find({_id:{$ne:Meteor.userId()}}).fetch();
    }
    let chatList =[];
    for(let i in chat){
        if(chat[i].senderId != Meteor.userId()){
            chatList.push(Meteor.users.findOne({_id:chat[i].senderId}));
        }else{
            chatList.push(Meteor.users.findOne({_id:chat[i].receiverId}));
        }
    }
    let filter = _.pluck(chatList,"_id");
    let list = [];
    for(let i in filter){
        if(list.indexOf(filter[i]) < 0){
            list.push(filter[i]);
        }
    }
    let userList = [];
    for(let i in list){
        userList.push(Meteor.users.findOne(list[i]));
    }
    let receiverId = user.length!=0?user[0]._id:null;
  return {
      isReady: handle.ready(),
      userImage :user.length!=0?Images.findOne({_id: user[0].profile.image}):null,
      senderImage: sender?Images.findOne({_id:sender.profile.image}):null,
      receiver: user.length!=0?Meteor.users.findOne({_id: user[0]._id}):null,
      sender:sender?sender:null,
      chatList: userList.length!=0?userList:[],
      users:Meteor.users.find({"_id":{$ne:Meteor.userId()}}),
      // edit: Session.get('chatId')?Conversation.findOne({_id:Session.get('chatId')}):null,
      /*unReadMessage: Conversation.find({receiverId : Meteor.userId(), senderId: user[0]._id, seen:false}).count() : 0*/
    }
},ConversationPage);
