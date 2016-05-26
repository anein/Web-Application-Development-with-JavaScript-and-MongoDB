/**
*
* Get username by its id
*
* @param {string} userId - user session Id
* 
* @return {string} Return username
*/
Template.registerHelper('getUsername', function (userId) {
  var u = Meteor.users.findOne({ _id: userId });
  // don't find user
  if (!u) return 'Anonymous';
  // has a username 
  if (u.profile.username) return u.profile.username;
  // user has only email address.  
  return u.emails[ 0 ].address;
});