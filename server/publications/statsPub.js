Meteor.publish('stats', function () {
  return stats.find();
});
