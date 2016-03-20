Meteor.subscribe("stats");

Template['stats'].helpers({
 'stat': function(){
                return stats.find();
    },
    /* hides feet and inches */
    'hideMetric': function(){
        var selectedMetric = Session.get("setMetric");
            return selectedMetric;
    }

});

Template['stats'].events({
    "change .conversion": function(event) {
        Session.set("setMetric",event.target.checked);
    },
    "submit form": function(event) {
        event.preventDefault();
        var Metric = Session.get("setMetric");

          var gender = event.target.gender.value;
          var age = parseInt(event.target.age.value);

        if (Metric == true) {

            var weight = parseInt(event.target.weight.value);
            var height = parseInt(event.target.height.value);


        } else {
        /* converting to metric before input */

        var weight = parseInt(event.target.weight.value) * 0.45359237;
        var height = Math.floor((parseInt(event.target.height_inches.value) + (parseInt(event.target.height_feet.value) * 12) ) * 2.54);

        }

        Meteor.call("insertStats", weight, height, gender, age);
        console.log("inserted");

    }

});