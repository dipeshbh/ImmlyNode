/**
 * Created by dipeshbhattacharya on 8/30/15.
 */
//start XML parsing
for(var i = 0; i < results.length; i++) {
    //console.log("results");
    //returnResults[i] = {};

    var sourceName = results[i].get("sourceName");
    var fileURL = results[i].get("sourceLogo").url();
    var feedURL = results[i].get("sourceURL");
    var feed = new gfeed.Feed(feedURL);


}

feed.listItems(function(articles) {

    console.log("returning results" + articles.length);



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
        if (x === articles.length - 1 ) {
            console.log("returning results" + returnResults.length);
            finalDict.push({
                key: sourceName,
                value: returnResults
            });
        }
    }

});