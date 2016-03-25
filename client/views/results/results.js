Meteor.subscribe('results');

Template['results'].helpers({
    'result': function(){
        
          return results.find({"sessionId": localStorage.getItem("sessionId"), "batchId": Session.get('batchId')});
 
    },        
    'resultBatch': function() {
        
        var array = results.find({"sessionId": localStorage.getItem("sessionId")}).fetch();
        
        var distinctArray   = _.uniq(array, false, function(d) {return d.batchId});
        var disctinctValues = _.pluck(distinctArray, 'batchId');
        
 
        
        return disctinctValues;
        
    }
    
    
});



Template['results'].events({
    'click .batch': function(e,t) {
        e.preventDefault();
        
        var batchId = e.currentTarget.id;
        Session.set('batchId',batchId);
        
        
    }
    
    
    
});


