//
// helpers 
//
Template.chat_page.helpers({
  /**
   * Get other user id
   * 
   * @return {String} other user id
   */
  otherUserId: function () {
    return Session.get('otherUserId');
  },
  /**
   * Get chat messages.
   * 
   * @return {Object | null } List of messages
   */
  messages: function () {

    var chat = Chats.findOne({ _id: Session.get('chatId') });

    if (chat) {
      return chat.messages;
    }

    return null;

  },
  /**
   *  Identify user authentication. 
   *
   *  @return {boolean}
   */
  isLogin: function () {
    return (Meteor.userId() !== null);
  }
});

//
// events
//
Template.chat_page.events({
  /**
   * This event fires when the user has sent a message on the chat page.
   * 
   * @throws {Meteor.Error} throw error when a new message is empty.
   * 
   * @param event
   */
  'submit .js-send-chat': function (event) {

    // stop the form from triggering a page reload
    event.preventDefault();

    // get new message
    var message = event.target.chat.value;

    if (!message) {
      throw new Meteor.Error('Message is empty');
    }

    // @todo Task 2: Implement data writing security
    // update the chat object in the database.
    Meteor.call('chat.action.update', Session.get('chatId'), message);

    // reset the form
    event.target.chat.value = '';

  }
});