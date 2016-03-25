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

Template['home'].events({
    
});
