Meteor.subscribe('results');

Template['results'].helpers({
    'result': function(){
  
        currentPage = Session.get("currentPage");
  
          if (Session.get("currentPage") == undefined || currentPage <= 0) {
            var currentPage = 1;
        }
        
        var skipCount = (currentPage -1) * 15;
    
        return results.find({"sessionId": localStorage.getItem("sessionId"), "batchId": Session.get('batchId')},{limit: 15, skip: skipCount});
 
    },        
    'resultBatch': function() {
        
        var array = results.find({"sessionId": localStorage.getItem("sessionId")}).fetch();
        
        var distinctArray   = _.uniq(array, false, function(d) {return d.batchId});
        var distinctValues = _.pluck(distinctArray, 'batchId');
        
        var arrayLength = distinctValues.length;
        
        
        var final = [];
        
        for(var i = 0; i <arrayLength; i++) {
            
            final.push({
                    batchId: distinctValues[i],
                    number: i
            });
            
        }
    
        
        return final; 
        
    },
    'pageList': function() {
        
        var count = results.find({"sessionId": localStorage.getItem("sessionId"), "batchId": Session.get('batchId')}).count();
        var pages = (count >= 0) ? Math.ceil(count / 15) : 1; 
        var current = Session.get("currentPage");
        var final = [];
        
        Session.set('maxPages',pages);
        
        
        
        for(var i = 1; i <= pages; i++) {
            
            var active = (current == i) ? "active" : "";
            
            final.push({
                    page: i,
                    active: active
            });
            
        }
        
        return final;
          
        
    },
    'batchNumber': function() {
           return Session.get('batchNumber');
           
    }
    
});


Template['results'].events({
    'click .batch': function(e,t) {
        e.preventDefault();
        
        
        var batchId = e.currentTarget.id;
        var batchNumber = t.find("input[name=batch-" + batchId + "]").value
        
        Session.set('batchId',batchId);
        Session.set('batchNumber', batchNumber);
        
        
    },
    'click .deleteBatch': function() {
        
        /* Confirm delete */
    
    },
    'click .prevPage': function(e) {
           e.preventDefault();
        
        var setPage = Session.get("currentPage");
        var currentPage = setPage - 1 ;
        
        if (Session.get("currentPage") == undefined || currentPage <= 0) {
            var currentPage = 1;
        }
        
        Session.set("currentPage",currentPage);
        
    },
    'click .nextPage': function(e) {
        e.preventDefault();
      
        var setPage = Session.get("currentPage");
        var currentPage = setPage + 1 ;
        var max = Session.get('maxPages');
        
          if (setPage < max) {
        
                if (Session.get("currentPage") == undefined || currentPage <= 0) {
                    currentPage = 1;
                }
                Session.set("currentPage",currentPage);
            
          }
        
    },
    'click .selectPage': function(e) {
        e.preventDefault();
        
        var pageId = e.currentTarget.text;
        
        console.log(pageId);
        
         Session.set("currentPage",pageId);
        
    }
    
    
    
});


