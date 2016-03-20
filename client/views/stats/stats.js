Template['stats'].helpers({

    /* hides feet and inches */
    'hideMetric': function(){
        var selectedMetric = Session.get("setMetric");
            return selectedMetric;
    }

});

Template['stats'].events({
    "change .conversion": function(event) {
        Session.set("setMetric",event.target.checked);
        console.log(Session.get("setMetric"));
    },
    "submit form": function(event) {
        event.preventDefault();



    }

});
