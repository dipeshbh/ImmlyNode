var express = require('express');
var router = express.Router();
var gfeed = require('google-feed-api');


function retrieveFeedSource(res) {
        //console.log("inside retrieveFeedSource function")
        var FeedSource = Parse.Object.extend("FeedSource");
        //console.log("FeedSource");
        var query = new Parse.Query(FeedSource);
        var returnResults = [{}];

        query.find({
            success: function(results) {
                
                
                for(var i = 0; i < results.length; i++) {
                  //console.log("results");
                  //returnResults[i] = {};
                  var sourceName = results[i].get("sourceName");
                  var fileURL = results[i].get("sourceLogo").url();
                  var feedURL = results[i].get("sourceURL");

                    var feed = new gfeed.Feed(feedURL);

                  //start XML parsing
                    feed.listItems(function(articles) {

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

                              // check we have reached the end of our list of articles & urls
                              if (x === articles.length - 1 && i === results.length - 1) {
                                  //res.render('hello', {returnResults : returnResults}); // end http response
                                  res.render('hello', {returnResults: returnResults});
                              } // else still have rss urls to check
                          }

                  });
                }
                
            },
            error: function(error) {
              console.log("Error: " + error.code + " " + error.message);
            }

        });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    retrieveFeedSource(res);
    //console.log("sourcename is" + newResults[1]["sourceName"]);
});



module.exports = router;


