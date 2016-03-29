/* Meteor.subscribe('results'); */

/* Applied for loading tempalte */
Template['results'].onCreated(function () {
  // Use this.subscribe inside onCreated callback

   this.subscribe( 'results', function() {
      
    
    $( ".loader" ).delay( 1000 ).fadeOut( 'slow', function() {
      
      $( ".load-wrapper" ).fadeIn( 'slow' );
    
    });
  });
  
  
});

Template['results'].onRendered( function() {
  $( ".loader" ).delay( 650 ).fadeIn();
 
    
});


Template['results'].helpers({
    'result': function(){
  
        currentPage = Session.get("currentPage");
  
          if (Session.get("currentPage") == undefined || currentPage <= 0) {
            var currentPage = 1;
        }
        
      
        if (Session.get("batchId") == undefined) {
            
            var latest = results.findOne({"sessionId": localStorage.getItem("sessionId")},{sort: {createdAt: -1}});
           
        
           var array = results.find({"sessionId": localStorage.getItem("sessionId")}).fetch();
        
            var distinctArray   = _.uniq(array, false, function(d) {return d.batchId});
            var distinctValues = _.pluck(distinctArray, 'batchId');
            
            var arrayLength = distinctValues.length;
          
              Session.set('batchNumber', arrayLength);
              Session.set('batchId', latest.batchId);
                
             var batchId = latest.batchId;
            
        } else {
            var batchId = Session.get("batchId");
        }
       
        var skipCount = (currentPage -1) * 15;
    
        return results.find({"sessionId": localStorage.getItem("sessionId"), "batchId": batchId},{limit: 15, skip: skipCount});
 
    },        
    'resultBatch': function() {
        
        var array = results.find({"sessionId": localStorage.getItem("sessionId")}).fetch();
        
        var distinctArray   = _.uniq(array, false, function(d) {return d.batchId});
        var distinctValues = _.pluck(distinctArray, 'batchId');
        
        var arrayLength = distinctValues.length;
        
        
        var final = [];
        
        for(var i = 0; i < arrayLength; i++) {
            
            final.push({
                    batchId: distinctValues[i],
                    number: (i+1)
            });
            
        }
    
        return final; 
        
    },
    'resultData': function() {
        var batchId = Session.get("batchId");
        
        var data = results.findOne({"sessionId": localStorage.getItem("sessionId"), "batchId": batchId});
        var metric = Session.get("setMetric");
        
        Session.set("startWeight",data.calc.weight);
        
        /* I should rewrite this using some sort of array push */
         if (metric == true) {
        
             return {
                  BMR: Math.round(data.calc.BMR),
                  age: data.calc.age, 
                  gender: data.calc.gender,
                  height: data.calc.height,
                  metric: true,
                  weight: Math.round(data.calc.weight),
                  caloriesIn: data.caloriesIn, 
                  caloriesOut: data.caloriesOut,
                  days: data.days,
                  caloriesPerDay: data.calc.caloriesPerDay
            };
                  
        } else {
             
            var height_inches =  Math.round((data.calc.height * 0.393701) % 12).toFixed(0);
            var height_feet   =  Math.floor((data.calc.height * 0.393701) / 12).toFixed(0); 
              
            return {
                  BMR: Math.round(data.calc.BMR),
                  age: data.calc.age, 
                  gender: data.calc.gender,
                  height_inches: height_inches,
                  height_feet: height_feet,
                  metric: false,
                  weight: Math.round(data.calc.weight * 2.20462),
                  caloriesIn: data.caloriesIn, 
                  caloriesOut: data.caloriesOut,
                  days: data.days,
                  caloriesPerDay: data.calc.caloriesPerDay
            };
              
        }

    },
    'endData': function() {
        var batchId = Session.get("batchId");    
        var data = results.findOne({"sessionId": localStorage.getItem("sessionId"), "batchId": batchId},{sort: {day: -1}});
        
        Session.set("endWeight",data.WeightInKgs);
        
      return data;
    },
    'weightLoss': function() {
      
        var starting = parseInt(Session.get("startWeight")).toFixed(2);
        var ending = parseInt(Session.get("endWeight")).toFixed(2);
        var final = starting - ending;
       
        var metric = Session.get("setMetric");
        
         if (metric == true) {
             return final;
         } else {
             return Math.round(final *  2.20462);
         }
   
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
           
    },
    'dropdownLabel' : function(){
        var label;

        if(Session.get('batchNumber') != undefined){
            label = 'Scenario #' + Session.get('batchNumber');
        }else{
            label = 'Choose Scenario';
        }
        return label;
    },
            'shareData': function() {
                
        /* Share weight loss plan*/
                
        return {
            title: "Eggs Benedict", 
            author: "Dane and Dalton Miller",
            summary: "Project built to display possible weight loss, over time!",
            description: "Project built to display possible weight loss, over time!",
            thumbnail: Meteor.absoluteUrl() + 'images/icon.png',
            media:  Meteor.absoluteUrl() + 'images/icon.png'
        };
        
        
    }
    
});


Template['results'].events({
    'click .batch': function(e,t) {
        e.preventDefault();
        
        
         $( ".batchTable" ).delay( 0 ).fadeOut( 'slow', function() {
             
            var batchId = e.currentTarget.id;
            var batchNumber = t.find("input[name=batch-" + batchId + "]").value;
        
            Session.set('batchId', batchId);
            Session.set('batchNumber', batchNumber);
            Session.set("currentPage", 1);
        
            $('.batch').removeClass('activeBatch');
            $('#' + Session.get('batchId')).addClass('activeBatch');
        
        $( ".batchTable" ).delay(500).fadeIn( 'slow' );

      });
        
        
        
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
        
        
         Session.set("currentPage",pageId);
        
    },
    'click .delete-batch': function(){
        Meteor.call('removeBatchData', Session.get('batchId'));
        
        
    },
     'click .chart-tab' : function(){
        $(".chart-well").removeClass("hidden");

    }
    
    
});


