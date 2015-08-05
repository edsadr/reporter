// Publishing collections

Meteor.publish("links", function() {
  return Links.find({
    published: true
  }, {
    fields: {
      user: 0
    }
  });
});

Meteor.publish('specificLink', function(id) {
  return Links.find({
    _id: id
  });
});

// Method setting the links public

Meteor.methods({
  publishLink: function(lid) {
    return Links.update({
      _id: lid
    }, {
      $set: {
        published: true
      }
    });
  }
});
