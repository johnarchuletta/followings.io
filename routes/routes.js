var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(server) {
    var controllers = require('../controllers/controllers.js');

    server
        .set('views', './views')
        .engine('html', require('ejs').renderFile)

        .use(express.static('./static'))
        .use(express.static('./bower_components'))

        .use(bodyParser.urlencoded({extended: true}))
        .use(bodyParser.json());

    server.get('/',
        function(req, res) {
            server.render('index.html',
                function(error, rendered) {
                    res.send(rendered);
                })
        });
};