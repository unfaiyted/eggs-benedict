
Template['loginBox'].helpers({
       "registerUser":function() {
        var registerSet = Session.get("switchSet");
        return registerSet;
    },
      "switch": function() {
            var registerSet = Session.get("switchSet");
            
            
            if (registerSet == true) {
                  return {
                          current: "Register", 
                          opposite: "Login", 
                          string: "Already have an account?"
                          };
            } else {
                  return {
                          current: "Login", 
                          opposite: "Register", 
                          string: "Need an account?"
                          };
            }
      },
      "formError": function() {
            var error = Session.get("formError");
            var errorDetail = Session.get("errorDetail");
            if (error == true) {
            return { valid: true, detail: errorDetail };
            }
            
      }
    
});

Template['loginBox'].events({
 "click .open-modal" : function(e,t) {
        e.preventDefault();
        Session.set("switchSet", false);
         Session.set("formError", false);
        $("#loginModal").modal("show");
        },
        
 "click .close-modal": function(e,t) {
      e.preventDefault();
      Session.set("switchSet", false);
       Session.set("formError", false);
      $("#loginModal").modal("hide");
      
 }, "click .Register-user": function(e,t) {
      e.preventDefault();
      e.target.value = "";
      Session.set("switchSet", true);
       Session.set("formError", false);
      
 },"click .Login-user": function(e,t) {
      e.preventDefault();
      e.target.value = "";
      Session.set("switchSet", false);
       Session.set("formError", false);
     
    /* Submitting Login  */
      
 },"click .Register-button": function(e,t) {
      e.preventDefault();
      
    var email = t.find("input[name=inputEmail]").value;
    var password = t.find("input[name=inputPassword]").value;
    var passwordRepeat = t.find("input[name=repeatPassword]").value;

   
     var $this = $(e.target);
        $this.button('loading');
    
    
    Accounts.createUser({
        email: email,
        password: password
    },  function(error,result) {
        if (error) {
            Session.set("formError", true);
            Session.set("errorDetail", error.reason);
        }else {
              Session.set("formError", false);
            Router.go('/');
            $("#loginModal").modal("hide");
        }
    });
    
    
     setTimeout(function() {
             $this.button('reset');
       }, 2000);
    
  
},"click .Login-button": function(e,t) {
      e.preventDefault();
      
     
        var $this = $(e.target);
        $this.button('loading');
    
      
      var email = t.find("input[name=inputEmail]").value;
      var password = t.find("input[name=inputPassword]").value;
        
      Meteor.loginWithPassword(email, password,
      
       function(error,result) {
        if (error) {
            Session.set("formError", true);
            Session.set("errorDetail", error.reason);
        }else {
              Session.set("formError", false);
            Router.go('/');
              $("#loginModal").modal("hide");
        }
    });
      
      setTimeout(function() {
             $this.button('reset');
       }, 2000);
       
      
      
 },"click .google-login": function(e,t) {
      e.preventDefault();
      
     
        var $this = $(e.target);
        $this.button('loading');
    
      
      var email = t.find("input[name=inputEmail]").value;
      var password = t.find("input[name=inputPassword]").value;
        
      Meteor.loginWithGoogle({
                requestPermissions: ['email', 'profile']
            },
      
       function(error,result) {
        if (error) {
            Session.set("formError", true);
            Session.set("errorDetail", error.reason);
        }else {
              Session.set("formError", false);
            Router.go('/');
              $("#loginModal").modal("hide");
        }
    });
      
      setTimeout(function() {
             $this.button('reset');
       }, 2000);
       
      
      
 }
 
 

});

Template['login'].helpers({
    "userEmail": function() {
         var meteorEmail = Meteor.user().emails[0].address;
           return meteorEmail;
      }, 
    "userAvatar": function() {
        
     if (Meteor.users.find({'profile.avatar': {$exists : true }}).count() == 0)  {
                   return { valid: false, location: "" }; 
             } else {
                  return { valid: true, location:  Meteor.user().profile.avatar };
                  
             }
    },
      
});

Template['login'].events({
    'click .logout': function(e){
        e.preventDefault();
        Meteor.logout();
    }
 
});


 