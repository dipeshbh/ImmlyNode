var express = require('express');
var router = express.Router();
var feed = require('feed-read-master');



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

                  //start XML parsing
                  feed(feedURL, function(err, articles) {

                    // loop through the list of articles returned
                    for (var x = 0; x < articles.length; x++) {

                        returnResults[x] = {};
                        returnResults[x]["sourceName"] = sourceName
                        returnResults[x]["fileURL"] = fileURL
                        returnResults[x]["title"] = articles[x].title;
                        returnResults[x]["link"] = articles[x].link;
                        returnResults[x]["content"] = articles[x].content;
                        returnResults[x]["published"] = articles[x].published;

                        // check we have reached the end of our list of articles & urls
                        if( x === articles.length-1 && i === results.length-1) {
                            res.render('hello', {returnResults : returnResults}); // end http response
                        } // else still have rss urls to check
                    } //  end 
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


