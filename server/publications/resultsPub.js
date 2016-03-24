Meteor.publish('results', function () {
    var currentUserId = this.userId;
    return results.find({createdBy: currentUserId});
});
