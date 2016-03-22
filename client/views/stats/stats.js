Meteor.subscribe("stats");
Meteor.subscribe("users");


Template['stats'].helpers({
    'stat': function() {
        return stats.find();
    },
    /* hides feet and inches */
    'hideMetric': function() {
        var selectedMetric = Session.get("setMetric");
        return selectedMetric;
    }

});

Template['stats'].events({
    "change .conversion": function(event) {
        Session.set("setMetric", event.target.checked);
    },
    "submit form": function(event) {
        event.preventDefault();
        var Metric = Session.get("setMetric");

        var gender = event.target.gender.value;
        var age = parseInt(event.target.age.value);
        if(parseInt(event.target.activityLevel.value) < 6 && parseInt(event.target.activityLevel.value) > 0){
            var activityLevelNum = parseInt(event.target.activityLevel.value);
            var activityLevel;
            switch(activityLevelNum){
                case 1:
                    activityLevel = 1.2;
                    break;
                case 2:
                    activityLevel = 1.375;
                    break;
                case 3:
                    activityLevel = 1.55;
                    break;
                case 4:
                    activityLevel = 1.725;
                    break;
                case 5:
                    activityLevel = 1.9;
                    break;
            }
            
        }else{
            alert('PLS NO');
        }
        


        if (Metric == true) {

            var weight = parseInt(event.target.weight.value);
            var height = parseInt(event.target.height.value);


        } else {
            /* converting to metric before input */

            var weight = parseInt(event.target.weight.value) * 0.45359237;
            var height = Math.floor((parseInt(event.target.height_inches.value) + (parseInt(event.target.height_feet.value) * 12)) * 2.54);

        }
        
        $('#stats').fadeOut('fast', function(){
            $('#calculations').fadeIn('fast');
        });
        
        Session.set('calculationsOn', 'true');
        Meteor.call("insertStats", weight, height, gender, age);
        Meteor.call("calculateBMR", gender, weight, height, age, activityLevel);
        console.log("inserted");

    }

});