Meteor.subscribe('results');
Template['charts'].helpers({
    'weightInKgs': function () {
        var sessionId = Session.get('sessionId');
        Meteor.call('generateChart', 'Weight in Kgs', 'WeightInKgs', sessionId, 'area', function(error, result){
            if(error){
                console.log(error.reason);
            }else{
                Session.set('kgsChartData', result);
            }
        });
        if(Session.get('kgsChartData') != undefined){
            return Meteor.defer(function(){Highcharts.chart('chart-kgs', Session.get('kgsChartData'));});
        }
    },
    'weightInLbs': function(){
        var sessionId = Session.get('sessionId');
        Meteor.call('generateChart', 'Weight in Pounds', 'WeightInLbs', sessionId, 'area', function(error, result){
            if(error){
                console.log(error.reason);
            }else{
                Session.set('lbsChartData', result);
            }
        });
        if(Session.get('lbsChartData') != undefined){
            return Meteor.defer(function(){Highcharts.chart('chart-lbs', Session.get('lbsChartData'));});
        }
    },
     'BMR': function(){
        var sessionId = Session.get('sessionId');
        Meteor.call('generateChart', 'Basal Metabolic Rate', 'BMR', sessionId, 'area', function(error, result){
            if(error){
                console.log(error.reason);
            }else{
                Session.set('BMRChartData', result);
            }
        });
        if(Session.get('BMRChartData') != undefined){
            return Meteor.defer(function(){Highcharts.chart('chart-BMR', Session.get('BMRChartData'));});
        }
    }
    
    
});

Template['charts'].events({
    
});