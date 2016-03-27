Meteor.subscribe("calculations");


Template['calculations'].helpers({
    'calculation': function(){
       
        var calc = calculations.findOne({"sessionId": localStorage.getItem("sessionId")}, {sort: {createdAt:-1}});
        
        Session.set("calcId",calc._id);
        
       /*var calc =  calculations.findOne({},{"sessionId": Meteor.default_connection._lastSessionId});*/
        return {
              BMR: Math.round(calc["BMR"]),
              age: calc["age"], 
              gender: calc["gender"],
              height: calc["height"],
              weight: Math.round(calc["weight"])
        };
    },
    'sliderValue': function() {
        return Session.get("sliderChange");
    }
});

Template['calculations'].events({
    'click .calc-button': function(e,t) {
            
            var sessionId     =  Session.get("sessionId");
            var caloriesIn    =  parseInt(t.find("input[name=caloriesIn]").value); 
            var caloriesOut   =  parseInt(t.find("input[name=caloriesOut]").value);
            var days          =  parseInt(t.find("input[name=hiddenDays]").value);

            var calc = calculations.findOne({"sessionId": localStorage.getItem("sessionId")},{sort:{createdAt: -1}});

            Meteor.call("batchGenerator", caloriesIn, caloriesOut, days, sessionId, calc, function(error, reason){
                  
                  if (error) {
                       "batchGenerator:" + error.reason
                  } else {
                        /* success! */
                        var batchId = results.findOne(
                        {"sessionId": localStorage.getItem("sessionId")},{sort: {createdAt: -1}}
                        ).batchId;
                        
                        Session.set("batchId", batchId);
                        
                         Router.go('/results/');
                  }
                  
                  
            });
               
          
    }
    
});

Template['calculations'].rendered = function () {
    
    var formSlider = this.$('#calcSlider').noUiSlider({
      start: Session.get("sliderChange"),
      connect: "lower",
      step: 1,
      range: {
        'min': 30,
        'max': 90
      }
    }).on('slide', function (ev, val) {
      // set real values on 'slide' event
      Session.set('sliderChange', [Math.round(val)]);
    }).on('change', function (ev, val) {
      // round off values on 'change' event
      Session.set('sliderChange', [Math.round(val)]);
      
    });
          
    };
      
    
  