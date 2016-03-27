charts = new Mongo.Collection('charts');

charts.attachSchema(
    new SimpleSchema({
    title: {
      type: String
    },
    content: {
      type: String
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  charts.allow({
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
    'generateChart': function(chartName, resultsElement, sessionId, chartType){
        var array = results.find({"sessionId": sessionId}).fetch();
        var distinctArray   = _.uniq(array, false, function(d) {return d.batchId});
        var distinctValues = _.pluck(distinctArray, 'batchId');
        
        var resultsDataArr = [];
        var resultsObjectArr = [];
        var resultsTypeArr = [];
        var seriesEl = [];
        
        distinctValues.forEach(function(item){
            var resultsData = results.find({batchId: item, sessionId: sessionId});
            resultsDataArr.push(resultsData.fetch());
        });
        
        resultsDataArr.forEach(function(item){
            resultsObjectArr.push(item);
        });
        
        resultsObjectArr.forEach(function(item) {
            var typeArr = [];
            for(var i = 0; i < item.length; i++){
               var resultsType = parseFloat(item[i][resultsElement]);
               typeArr.push(resultsType);
               
           }
           resultsTypeArr.push(typeArr);
        });
        var index = 0;
        resultsTypeArr.forEach(function(item) {
            var seriesElement = {name: distinctValues[index], data: item};
            seriesEl.push(seriesElement);
            index++;
            
        });

      var resultElement = (
        {
          yAxis: {
            title: {
              text: chartName
            }
          },
          xAxis: {
            title: {
              text: "Number of Days"
            }
          },
          title: {
            text: chartName
          },
          chart: {
            type: chartType
          },
          series: seriesEl
        }
        
        );
        
        return resultElement;

    }
  });
}