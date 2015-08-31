var express = require('express');
var router = express.Router();
var gfeed = require('google-feed-api');
var async = require('async');


function retrieveFeedSource(res) {
        //console.log("inside retrieveFeedSource function")
        var FeedSource = Parse.Object.extend("FeedSource");
        //console.log("FeedSource");
        var query = new Parse.Query(FeedSource);
        var finalDict = [];
        var queryResults = [{}];
        var count = 0;

        query.find().then(function(results) {

            queryResults = results;

        }, function(error) {
            console.log("Error: " + error.code + " " + error.message);
        });

        async.each(queryResults, function(result,processreq) {

            var sourceName = result.get("sourceName");
            var fileURL = result.get("sourceLogo").url();
            var feedURL = result.get("sourceURL");

            var feed = new gfeed.Feed(feedURL);

            //start XML parsing

            feed.listItems(function(articles) {

                console.log("returning results" + articles.length);
                var returnResults = [{}];

                // loop through the list of articles returned
                for (var x = 0; x < articles.length; x++) {

                    var entry = articles[x];

                    returnResults[x] = {};
                    returnResults[x]["sourceName"] = sourceName;
                    returnResults[x]["fileURL"] = fileURL;
                    returnResults[x]["title"] = entry.title;
                    returnResults[x]["link"] = entry.link;
                    returnResults[x]["summary"] = entry.contentSnippet;
                    returnResults[x]["date"] = entry.publishedDate;
                    finalDict.push(returnResults);


                }

            });

            processreq(res);

        }, function (err) {
            console.log("error in async function");
        });
}

var processreq = function (res) {
    console.log ("inside process req");
    res.render("hello", {returnResults : finalDict});
}

/* GET home page. */
router.get('/', function(req, res, next) {
    retrieveFeedSource(res);
    //console.log("sourcename is" + newResults[1]["sourceName"]);
});



module.exports = router;


