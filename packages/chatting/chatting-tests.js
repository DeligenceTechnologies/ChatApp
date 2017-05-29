// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by chatting.js.
import { name as packageName } from "meteor/saranshdev:chatting";

// Write your tests here!
// Here is an example.
Tinytest.add('chatting - example', function (test) {
  test.equal(packageName, "chatting");
});
