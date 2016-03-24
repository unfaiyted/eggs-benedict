Meteor.subscribe('results');

Template['results'].helpers({
    'result': function(){
        var currentUserId = Meteor.userId();
        return results.find();
    }
});

Template['results'].events({
});
