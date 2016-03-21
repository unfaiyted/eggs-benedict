Meteor.subscribe("calculations");

Template['calculations'].helpers({
    'calculation': function(){
        return calculations.find();
    },
});

Template['calculations'].events({
});
