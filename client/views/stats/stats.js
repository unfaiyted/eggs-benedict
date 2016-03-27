Meteor.subscribe("stats");

Template['stats'].helpers({
    'stat': function() {
        return stats.find();
    },
    /* hides feet and inches */
    'hideMetric': function() {
        var selectedMetric = Session.get("setMetric");
        return selectedMetric;
    },
    'weightType': function() {
        var selectedMetric = Session.get("setMetric");
        
        if (selectedMetric == true) {
            return "125 kgs";
        }else {
            return "250 lbs";
        }
        
    }

});

Template['stats'].events({
    "change .conversion": function(event,template) {
        Session.set("setMetric", event.target.checked);
    },
    "submit form": function(event, template) {
        event.preventDefault();
        
        
        var Metric = Session.get("setMetric");

        var gender = template.find('input:radio[name=gender]:checked').value;
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
            var height = Math.floor((parseInt(event.target.height_inches.value)
                + (parseInt(event.target.height_feet.value) * 12)) * 2.54);

        }
        

        
        if (localStorage.getItem("sessionId") === undefined) {
            
            var sessionId = Random.id();
            Session.set("sessionId",sessionId); 
            localStorage.setItem("sessionId",sessionId);
        
        } else {
            var sessionId =  localStorage.getItem("sessionId");
    
        }
        
        console.log(gender);
         console.log(weight);
         console.log(height);
        
          console.log(sessionId.toString());
        
        Meteor.call("insertStats", weight, height, gender, age, sessionId.toString(), function(error,result) {
        if (error) {
            console.log("insertStats:" + error.reason);
        } else {
            
            var inputStats = stats.findOne({"sessionId": localStorage.getItem("sessionId")},{sort: {createdAt: -1}});
            
             Meteor.call("insertCalc", gender, weight, height, age, activityLevel, sessionId, inputStats, function(error,result){
                
                if(error) {
                 console.log("insertCalc:" + error.reason); 
                } else {
                  Session.set('calculationsOn', 'true');
                  Router.go('/calculate/')
                }
             
             
             });
            
        }    
            
        });
      

        
    }

});