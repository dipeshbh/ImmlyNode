var express = require('express');
var router = express.Router();


function retrieveFeedSource() {
        console.log("inside retrieveFeedSource function")
        var FeedSource = Parse.Object.extend("FeedSource");
        console.log("FeedSource");
        var query = new Parse.Query(FeedSource);
        query.find({
            success: function(results) {
                console.log("results"+results.length);
                for(var i = 0; i < results.length; i++) {
                  console.log("results");
                  var source = results[i];
                  var sourceName = source.get('sourceName');
                  console.log("sourcename" + sourceName)
                }
            },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);
            }
        });   
}

/* GET home page. */
router.get('/', function(req, res, next) {
    retrieveFeedSource();
    console.log("inside parse method");
    res.render('hello', {});
});



module.exports = router;


