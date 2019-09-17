var fs = require('fs');
var fileName = "simple_module.js";
fs.readFile(fileName, 'utf8', function(err, fileContent) {
    if (err) {
        console.error(err);
    } else {
        console.log('got file content', fileContent);
    }
});