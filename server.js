var express = require('express');
var http = require('http');
var mongoose = require('mongoose');

var server = express();

mongoose.connect('mongodb://localhost',
    function(error) {
        if (error) console.log(error.toString());
    });

var port = process.env.PORT || 4000;

http.createServer(server).listen(port);

require('./models/models.js');
require('./routes/routes.js')(server);

console.log('Server now listening on port ' + port);