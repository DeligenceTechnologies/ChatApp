Npm.depends({
  'create-react-class':'15.5.3',
  'fs': '0.0.1-security',
  'react': '0.14.6',
  'react-dom': '15.5.4' ,
  'react-addons-transition-group': '15.5.2',
  'react-addons-css-transition-group': '15.5.2',
  'react-addons-linked-state-mixin': '15.5.2',
  'react-addons-create-fragment': '15.5.4',
  'react-addons-update': '15.5.2',
  'react-addons-test-utils': '15.5.1',
  'react-addons-perf': '15.4.2',
  'react-mounter': '1.2.0'
});

Package.describe({
  name: 'deligencetechnologies:chatting',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'chatting package for ChatApp',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/DeligenceTechnologies/ChatApp/tree/master/packages/chatting',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.4.2');

  api.use('accounts-password');
  api.use('cfs:gridfs@0.0.33');
  api.use('cfs:standard-packages@0.5.9');
  api.use('ecmascript');
  api.use("ejson");
  api.use("fortawesome:fontawesome@4.4.0_1");
  api.use("jquery");
  api.use('kadira:flow-router@2.12.1');
  api.use('kadira:react-layout@1.5.3');
  api.use("meteor-base");
  api.use("mongo");
  api.use('react-meteor-data@0.2.11');
  api.use('session@1.1.7');
  api.use('themeteorchef:bert@2.1.2');
  api.use('twbs:bootstrap@3.3.6');
  api.use('underscore');


  api.mainModule('chatting.js');

  api.addFiles('server/startup.js', ['server']);

  api.addFiles('chat/ui/Home.jsx', ['client']);
  api.addFiles('chat/ui/Member.jsx', ['client']);
  api.addFiles('chat/ui/MembersList.jsx', ['client']);
  api.addFiles('chat/ui/ConversationPage.jsx', ['client']);
  api.addFiles('imports/Style/chatStyle.css', ['client']);

  api.addFiles('chat/lib/router/router.jsx', ['client','server']);
  api.addFiles('chat/lib/methode/methode.js', ['client','server'])


  api.export([
    'Home'
  ],['client']);
});



Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('deligencetechnologies:chatting');
  api.mainModule('chatting-tests.js');
});
