
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
                          string: "Need an account?"
                          };
            } else {
                  return {
                          current: "Login", 
                          opposite: "Register", 
                          string: "Already have an account?"
                          };
            }
      }
    
});

Template['loginBox'].events({
 "click .open-modal" : function(e,t) {
        e.preventDefault();
        Session.set("switchSet", false);
        $("#loginModal").modal("show");
        },
        
 "click .close-modal": function(e,t) {
      e.preventDefault();
      Session.set("switchSet", false);
      $("#loginModal").modal("hide");
      
 }, "click .Register-user": function(e,t) {
      e.preventDefault();
      Session.set("switchSet", true);
      
 },"click .Login-user": function(e,t) {
      e.preventDefault();
      Session.set("switchSet", false);
     
    /* Submitting Login  */
      
 },"click .Register-button": function(e,t) {
      e.preventDefault();
    var email = t.find("input[name=inputEmail]").value;
    var password = t.find("input[name=inputPassword]").value;
    var passwordRepeat = t.find("input[name=repeatPassword]").value;
    
    
    Accounts.createUser({
        email: email,
        password:password
    }), function(error) {
        if (error) {
            alert(error);
        }else {
            Router.go('/');
        }
    }
        
},"click .Login-button": function(e,t) {
      e.preventDefault();
      var email = t.find("input[name=inputEmail]").value;
      var password = t.find("input[name=inputPassword]").value;
        
      Meteor.loginWithPassword(email, password);
 }

});



Template['login'].helpers({
  
      
});

Template['login'].events({
    'click .logout': function(e){
        e.preventDefault();
        Meteor.logout();
    }
 
});
