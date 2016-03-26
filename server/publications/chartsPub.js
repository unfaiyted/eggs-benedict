Meteor.publish('charts', function () {
  return charts.find();
});
