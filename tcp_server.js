var net = require('net');
var server = net.createServer();
server.on('connection', function(stream) {
    stream.setEncoding('utf8');
    console.log('got new stream');
    stream.on('readable', function() {
        var buf;
        while( buf = stream.read()){
            console.log('data: ', buf);
            stream.write(buf.toUpperCase());
        }
    });
    stream.on('end', function() {
        console.log('stream ended');
    });
});

server.listen(8080);