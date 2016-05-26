//
// @todo Task 2: Implement data writing security
// --
// Remove the insecure package from the application and implement a Meteor method
// to allow the insertion of chat items in the Chats collection.
// Test that you cannot insert items directly any more.
// --
//

Meteor.methods({
  /**
   * Find a chat session that has two users that match with the current authorized user
   * and the requested user id. Otherwise, create a new chat session with the users.
   * 
   * @throws {Meteor.Error} throw error when user not authorized
   *
   * @param {string} otherUserId
   *
   * @returns {string} Chat Id
   */
  'chat.action.start': function (otherUserId) {

    check(otherUserId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    var chat = Chats.find({
      $or: [
        { user1Id: this.userId, user2Id: otherUserId },
        { user1Id: otherUserId, user2Id: this.userId }
      ]
    });

    // no chat matching the filter - need to insert a new one
    if (chat.count() === 0) {
      return Chats.insert({ user1Id: this.userId, user2Id: otherUserId });
    }

    var id = chat.fetch()[ 0 ]._id;

    // there is a chat going already - use that.
    return id;

  },
  /**
   * Update the current chat adding a new message to it.
   * 
   * @throws {Meteor.Error} throw error when user not authorized
   *
   * @param {string} id  - chat id.
   * @param {string} message - user message.
   */
  'chat.action.update': function (id, message) {

    check(id, String);
    check(message, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // see if we can find a chat object in the database
    // to which we'll add the message
    var chat = Chats.findOne({ _id: id });

    if (!chat) {
      throw new Meteor.Error('Chat is not found');
    }

    // pull the messages property
    var msgs = chat.messages;

    // no messages yet, create a new array
    if (!msgs) {
      msgs = [];
    }

    // is a good idea to insert data straight from the form
    // (i.e. the user) into the database?? certainly not.
    // push adds the message to the end of the array

    msgs.push({ text: message, user_id: Meteor.userId() });

    // put the messages array onto the chat object
    chat.messages = msgs;

    Chats.update(chat._id, chat);
  }
});