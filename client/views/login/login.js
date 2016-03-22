
Template['login'].helpers({
      
      
});

Template['login'].events({
 "click .open-modal" : function(e,t) {
        e.preventDefault();
        $("#loginModal").modal("show");
        },
        
 "click .close-modal": function(e,t) {
      e.preventDefault();
      $("#loginModal").modal("hide");
      
 
       
 }
 

});