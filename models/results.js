results = new Mongo.Collection('results');

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {

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
        'batchGenerator': function(caloriesIn, caloriesOut, days, sessionId, calc){
            
            check(caloriesIn, Number);
            check(caloriesOut, Number);
            check(days, Number);
          
    
            /*Get Data from the BMR Cals*/
            var calc = calculations.findOne({"sessionId": sessionId}, {sort: {createdAt:-1}, limit: 1});
            var userId = this.userId;
            var batchId = Random.id();
            
            
            var BMR = calculateBMR(calc.gender, calc.weight, calc.height, calc.age, calc.activityAmount);
            
            var weight = calc.weight;
            var gender = calc.gender;
            var height = calc.height;
            var age = calc.age;
            var activityAmount = calc.activityAmount;
            
            
            var weightLossInCals = BMR - caloriesIn + caloriesOut;
            var weightLossInKgs = weightLossInCals / 7716;
            
            
            for(var i = 0; i < days; i++){
                
                var currentWeightinCals = weight * 7716;
                var WeightInCals = currentWeightinCals - weightLossInCals;
                var WeightInKgs = WeightInCals / 7716;
                var WeightInLbs = WeightInKgs * 2.20462;
                
                var day = i+1;
              
                results.insert({
                    batchId: batchId,
                    sessionId: sessionId,
                    calc: calc,
                    createdBy: userId,
                    createdAt: new Date(),
                    WeightInCals: WeightInCals.toFixed(2),
                    WeightInKgs: WeightInKgs.toFixed(2),
                    WeightInLbs: WeightInLbs.toFixed(2),
                    day: day,
                    BMR: BMR.toFixed(2),
                    caloriesIn: caloriesIn,
                    caloriesOut: caloriesOut,
                    days: days
                });
              
                weight = WeightInKgs;
                BMR = calculateBMR(gender, weight, height, age, activityAmount);
            }
            
        },
        'removeBatchData': function(batchId){
            results.remove({batchId: batchId});
        }
    });
    
    
}

  