var fs = require('fs');

var stream = fs.createReadStream('./uiso9_pe.exe');

stream.on('readable', function() {
    var chunk;
    while(chunk = stream.read()) {
        console.log('got NPM data chunck of %d bytes', chunk.length);
    }
});

stream.once('end', function() {
    console.log('stream ended');
});