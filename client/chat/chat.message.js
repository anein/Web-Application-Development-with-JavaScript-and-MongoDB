//
// Helper functions for the message template.
//

Template.chat_message.helpers({
  /***
   * Get user avatar
   *
   * @param {string} userId - user session id
   * 
   * @returns {string} Link to the user avatar
   */
  getAvatar: function (userId) {

    var u = Meteor.users.findOne({ _id: userId });
    // don't find user 
    if (!u || !u.profile.avatar) return;

    return u.profile.avatar;

  }
});