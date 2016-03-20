

calculations = new Mongo.Collection('calculations');


// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Meteor.methods({
        "calculateBMR": function(gender, weight, height, age, activityAmmount) {
            console.log("called");
            if (gender == 'male') {
                var BMR = (88.362 + (13.307 * weight) + (4.799 * height) - (5.677 * age)) * activityAmmount;
            }else{
                var BMR = (447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age)) * activityAmmount;
            }
            
            calculations.insert({
                BMR: BMR
            });
            
        },
        "numOfDaysGoalCompleted": function(beginningDay, dayCompleted){
            var beginningDay;
            var dayCompleted;
            var goalCompletedIn = dayCompleted - beginningDay;
        }
        
    });
}
