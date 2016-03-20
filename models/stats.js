stats = new Mongo.Collection('stats');

stats.attachSchema(
    new SimpleSchema({
    weight: {
      type: Number,
      label: "Current Weight",
    },
    height: {
      type: Number,
      label: "Height"
    },
    gender: {
      type: String,
      label: "Gender"
    },
    age: {
      type: Number,
        label:"Age"
    },
    createdAt: {
      type: Date,
      denyUpdate: true,
      label:"Created At"
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
}
