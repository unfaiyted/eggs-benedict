Meteor.startup(function () {
        Session.setDefault("sliderChange", [60]);
      
      Session.set("sessionId", localStorage.getItem("sessionId"));   
     
       if (localStorage.getItem("sessionId") == null ) {
                localStorage.setItem("sessionId", Random.id());
                Session.set("sessionId", localStorage.getItem("sessionId"));
          } else {
             Session.set("sessionId", localStorage.getItem("sessionId"));    
          }
     
});


