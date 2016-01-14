var express = require('express');
var http = require('http');
var mongoose = require('mongoose');

var server = express();

mongoose.connect('mongodb://localhost',
    function(error) {
        if (error) console.log(error.toString());
    });

var port = process.env.PORT || 3000;

http.createServer(server).listen(port);

require('./server/models/models.js');
require('./server/routes/routes.js')(server);

console.log('Server now listening on port ' + port);