
// set up the main template the the router will use to build pages
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});
// specify the top level route, the page users see when they arrive at the site
Router.route('/', function () {
  // reset global variables
  delete Session.keys.chatId;
  delete Session.keys.otherUserId;
  //
  this.render("navbar", { to: "header" });
  this.render("lobby_page", { to: "main" });
});

// specify a route that allows the current user to chat to another users
Router.route('/chat/:_id', function () {
  // the user they want to chat to has id equal to
  // the id sent in after /chat/...
  var otherUserId = this.params._id;

  // @todo Task 2: Implement data writing security
  Meteor.call('chat.action.start', otherUserId, function (err, res) {
    Session.set("otherUserId", otherUserId);
    Session.set("chatId", res);
  });

  this.render("navbar", { to: "header" });
  this.render("chat_page", { to: "main" });
});