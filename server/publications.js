// @todo Task 3: Implement data reading security
// --
// Remove the autopublish package from the application and implement publish and subscribe for Chats.
// Users should only be able to retrieve chats that have their user id in either the user1Id field or the user2Id field.
// Test by logging in as different users and checking what you can see
// --

/**
 * Get users only with profile and emails fields.
 */
Meteor.publish('users', function () {
  return Meteor.users.find({}, {
    fields: { profile: 1, emails: 1 }
  });
});

/**
 * Get chat messages of the authorized user.
 * In fact, we allow our users to work only with own chats.
 * [pam-pam!]
 */
Meteor.publish('chat.db.messages', function () {

  if (!this.userId) {
    return this.ready();
  }

  // set the filter
  var filter = {
    $or: [
      { user1Id: this.userId },
      { user2Id: this.userId }
    ]
  };

  var chat = Chats.find(filter);

  if (chat) return chat;

  return this.ready();
});