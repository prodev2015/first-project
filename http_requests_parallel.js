var http = require('http');

var urls = [
    'http://search.twitter.com/search.json?q=Node',
    'http://search.twitter.com/search.json?q=javascript'
];

var allResults = [];
var responded = 0;

function collectResponse(res) {
    var responseBody = '';
    res.setEncoding('utf8');

    /// collect the response body

    res.on('data', function(d) {
        responseBody += d;
    });

    res.on('end', function() {
        var response = JSON.parse(responseBody);
        allResults = allResults.concat(response.allResults);
        console.log('I have %d results for', allResults.length, res.req.path);
        responded += 1;

        if(responded == urls.length) {
            console.log('All responsed ended. Number of total results:', allResults.length);
        }
    });
}

urls.forEach(function(url) {
    http.get(url, collectResponse);
})