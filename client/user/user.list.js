//
// Helper function
//
Template.available_user_list.helpers({
  /**
   * Get available users.
   *
   * @returns {JSON|Cursor|{}}
   */
  users: function () {
    return Meteor.users.find();
  }
});