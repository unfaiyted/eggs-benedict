calculations = new Mongo.Collection('calculations');


calculations.attachSchema(
    new SimpleSchema({
    weight: {
      type: Number,
      label: "Weight",
        decimal: true
    },
    sessionId: {
      type: String,
      label: "Session Id"
    },
    height: {
      type: Number,
      label: "Height",
      decimal: true
    },
    gender: {
      type: String,
      label: "Gender",
      allowedValues: ['male', 'female']
    },
    age: {
      type: Number,
        label:"Age"
    },
    day: {
      type: Number,
        label:"Day Counter",
        autoValue: function() {
            return 1;
        }
    },
    activityAmount: {
        type: Number,
        label:"Daily Activity Level",
        decimal: true
    },
    BMR: {
      type: Number,
        label:"Current BMR",
         decimal: true
    },
    caloriesPerDay: {
      type: Number,
      label:"Calories burnt",
       decimal: true
    },
    resultsId: {
      type: String,
        label: "Associated Result Id",
        optional: true
    },
    createdAt: {
      type: Date,
      denyUpdate: true,
      label:"Created At",
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    updatedAt: {
      type: Date,
      denyUpdate: false,
      label: "Updated At",
        autoValue: function() {
            if (this.isUpdate) {
                return new Date;
            }
        }
    }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Meteor.methods({
        "insertCalc": function(gender, weight, height, age, activityAmount, sessionId) {
           
              check(gender, String);
              check(weight, Number);
              check(height, Number);
              check(age, Number);
              check(activityAmount, Number);
              check(sessionId, String);
            
            var BMR = calculateBMR(gender, weight, height, age);
            var caloriesPerDay = Math.round(BMR * activityAmount);
          
            calculations.insert({
                weight: weight,
                height: height,
                age: age,
                gender: gender,
                activityAmount: activityAmount,
                BMR: BMR,
                sessionId: sessionId,
                caloriesPerDay: caloriesPerDay, 
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