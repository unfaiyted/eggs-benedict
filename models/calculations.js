calculations = new Mongo.Collection('calculations');


// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Meteor.methods({
        "insertCalc": function(gender, weight, height, age, activityAmount, sessionId, stats) {
           
              check(gender, String);
              check(weight, Number);
              check(height, Number);
              check(age, Number);
              check(activityAmount, Number);
              check(sessionId, String);
              
              
            var BMR = calculateBMR(gender, weight, height, age);
            var caloriesPerDay = Math.round(BMR * activityAmount);
          
            calculations.insert({
                weight: weight.toFixed(2),
                height: height.toFixed(2),
                age: age,
                gender: gender,
                activityAmount: activityAmount,
                BMR: BMR.toFixed(2),
                sessionId: sessionId,
                stats: stats,
                caloriesPerDay: caloriesPerDay.toFixed(2), 
                updatedAt: new Date(),
                createdAt: new Date()
              
            });
            
        }
        
    });
}


calculateBMR = function(gender, weight, height, age, activityAmount) {
  
      if (activityAmount === undefined) { activityAmount = 1; }
  
      if (gender == 'male') {
                var BMR = (88.362 + (13.307 * weight) + (4.799 * height) - (5.677 * age)) * activityAmount;
      }else{
                var BMR = (447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age)) * activityAmount;
      }
      
  return BMR;
}