Template['footer'].helpers({
    'forwardLocation': function(){
        var forwardLocation = Session.get('forwardLocation');
        if(forwardLocation == undefined){
            forwardLocation = '';
        }
        return forwardLocation;
    },
    'backLocation': function(){
        var backLocation = Session.get('backLocation');
        if(backLocation == undefined){
            backLocation = '';
        }
        return backLocation;
    },
    'backDesc': function(){
        var backDesc = Session.get('backDesc');
        if(backDesc == undefined){
            backDesc = '';
        }
        return backDesc;
    },
    'forwardDesc': function(){
        var forwardDesc = Session.get('forwardDesc');
        if(forwardDesc == undefined){
            forwardDesc = '';
        }
        return forwardDesc;
    }
});


Template['home'].helpers({
    'shareData': function() {
        return {
            title: "Eggs Benedict", 
            author: "Dane and Dalton Miller",
            summary: "Project built to display possible weight loss, over time!",
            description: "Project built to display possible weight loss, over time!",
            thumbnail: Meteor.absoluteUrl() + 'images/icon.png',
            media:  Meteor.absoluteUrl() + 'images/icon.png'
        };
    }
    
});

Template['home'].events({
    
});
