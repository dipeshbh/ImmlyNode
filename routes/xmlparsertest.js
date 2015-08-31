var express = require('express');
var router = express.Router();
var gfeed = require('google-feed-api');
var async = require('async');


function retrieveFeedSource(res) {
        //console.log("inside retrieveFeedSource function")
        var FeedSource = Parse.Object.extend("FeedSource");
        //console.log("FeedSource");
        var query = new Parse.Query(FeedSource);
        var queryResults = [];
        var returnResults = [{}];
        var finalDict = [];
        var count = 0;


        query.find().then(function(results){
            queryResults = results;

            async.each(results,function(result){


            });

        }, function(error) {
            console.log("Error: " + error.code + " " + error.message);
        });


    
}

/* GET home page. */
router.get('/', function(req, res, next) {
    retrieveFeedSource(res);
    //console.log("sourcename is" + newResults[1]["sourceName"]);
});



module.exports = router;


