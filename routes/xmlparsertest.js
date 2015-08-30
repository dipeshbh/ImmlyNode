var express = require('express');
var router = express.Router();
var gfeed = require('google-feed-api');


function retrieveFeedSource(res) {
        //console.log("inside retrieveFeedSource function")
        var FeedSource = Parse.Object.extend("FeedSource");
        //console.log("FeedSource");
        var query = new Parse.Query(FeedSource);
        var returnResults = [{}];
        var count = 0;

        query.find().then(function(results){ 
                
                
                for(var i = 0; i < results.length; i++) {
                  //console.log("results");
                  //returnResults[i] = {};
                  var sourceName = results[i].get("sourceName");
                  var fileURL = results[i].get("sourceLogo").url();
                  var feedURL = results[i].get("sourceURL");

                    var feed = new gfeed.Feed(feedURL);

                  //start XML parsing
                    feed.listItems(function(articles) {

                      console.log("returning results" + articles.length);

                          // loop through the list of articles returned
                          for (var x = 0; x < articles.length; x++) {

                              var entry = articles[x];

                              returnResults[count] = {};
                              returnResults[count]["sourceName"] = sourceName;
                              returnResults[count]["fileURL"] = fileURL;
                              returnResults[count]["title"] = entry.title;
                              returnResults[count]["link"] = entry.link;
                              returnResults[count]["summary"] = entry.contentSnippet;
                              returnResults[count]["date"] = entry.publishedDate;
                              count++;

                              // check we have reached the end of our list of articles & urls
                              if (x === articles.length - 1 && i === results.length) {
                                  console.log("returning results" + count);
                                  res.render('hello', {returnResults: returnResults});
                              } // else still have rss urls to check*/
                          }

                  });
                }
                
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


