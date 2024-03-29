var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
    '.js' : 'text/javascript',
    '.html': 'text/html',
    '.css' : 'text/css'
};

var cache = {};
function cacheAndDeliver(f, cb) {
    fs.stat(f, function(err, stats) {
        if(err) {
            return console.log('Oh, no!, Error', err); 
        }
        var lastChanged = Date.parse(stats.ctime),
        isUpdated = (cache[f]) && lastChanged > cache[f].timestamp;
        if(!cache[f] || isUpdated) {
            fs.readFile(f, function(err, data) {
                console.log('loading ' + f + ' from file');
                if (!err) {
                    cache[f] = {content: data, timestamp: Date.now()} ;
                }
                    cb(err, data);
            });
        }
    });
    // if (!cache[f]) {
    //     fs.readFile(f, function(err, data) {
    //         if (!err) {
    //             cache[f] = {content: data, timestamp: Date.now()} ;
    //         }
    //             cb(err, data);
    //     }); 
    //     return;
    // }
    console.log('loading ' + f + ' from cache');
    cb(null, cache[f].content);
}
http.createServer(function (request, response) {
    var lookup = path.basename(decodeURI(request.url)) || 'index.html';
    console.log(lookup);
    var f = 'public/' + lookup;
    fs.exists(f, function(exists) {
        console.log(exists ? lookup + " is there" :lookup + " doesn't exist");
        if(exists) {
            cacheAndDeliver(f, function(err, data) {
                if(err) {
                    response.writeHead(500);
                    response.end('Server Error!');
                    return;
                }
                var headers = {'Content-type': mimeTypes[path.extname(lookup)]};
                response.writeHead(200, headers);
                response.end(data);    
            })
            return;
        }
        response.writeHead(404);
        response.end();
    });
}).listen(8080);