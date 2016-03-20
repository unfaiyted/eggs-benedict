Meteor.publish('calculations', function () {
  return calculations.find();
});
