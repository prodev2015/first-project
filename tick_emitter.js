var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter;

var count = 0;
setInterval(function() {
    emitter.emit('tick', count);
    count ++;

}, 1000);

emitter.on('tick', function(count) {
    console.log('tick:', count);
});