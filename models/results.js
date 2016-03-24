results = new Mongo.Collection('results');

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    stats = Meteor.subscribe('stats');
  results.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });

    Meteor.methods({
        'batchGenerator': function(gender, weight, height, age, activityAmount, BMR, workoutInCals, numOfDays, calAmount){
            check(gender, String);
            check(weight, Number);
            check(height, Number);
            check(age, Number);
            check(activityAmount, Number)
            check(BMR, Number);
            check(workoutInCals, Number);
            check(numOfDays, Number);
            check(calAmount, Number);
            
            var currentUserId = this.userId;
            var batchId = Random.id();
            var weightLossInCals = BMR - calAmount + workoutInCals;
            var weightLossInKgs = weightLossInCals / 7716;
            for(var i = 0; i < numOfDays; i++){
                var currentWeightinCals = weight * 7716;
                var newWeightInCals = currentWeightinCals - weightLossInCals;
                var newWeightInKgs = newWeightInCals / 7716;
                results.insert({
                    batchId: batchId,
                    createdBy: currentUserId,
                    newWeightInCals: newWeightInCals,
                    newWeightInKgs: newWeightInKgs,
                    newBMR: BMR
                });
                weight = newWeightInKgs;
                BMR = Meteor.call('calculateBMR', gender, weight, height, age, activityAmount);
            }
            
            console.log(results.find().fetch());
        }
    });
    
    
}
