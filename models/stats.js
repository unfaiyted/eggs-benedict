stats = new Mongo.Collection('stats');
stats.attachSchema(
    new SimpleSchema({
    weight: {
      type: Number,
      label: "Current Weight",
        decimal: true
    },
    height: {
      type: Number,
      label: "Height",
      decimal: true
    }, 
    sessionId: {
      type: String,
      label: "Session Id"
    },
    gender: {
      type: String,
      label: "Gender",
    },
    age: {
      type: Number,
        label:"Age"
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

  stats.allow({
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
        insertStats: function(weight, height, gender, age, sessionId){
            check(weight, Number);
            check(height, Number);
            check(gender, String);
            check(age, Number);
            check(sessionId, String);
            
            stats.insert({
               weight: weight,
               height: height,
               gender: gender,
               age: age,
               sessionId: sessionId,
               updatedAt: new Date(),
               createdAt: new Date()
            });
            
        },
        deleteStats: function (statsId) {
            stats.remove(statsId);
        }

    });

}