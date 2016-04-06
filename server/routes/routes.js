var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(server) {
    var controllers = require('../controllers/controllers.js');

    server
        .set('views', './public')
        .engine('html', require('ejs').renderFile)

        .use(express.static('./public'))
        .use(express.static('./node_modules/angular2'))
        .use(express.static('./node_modules/systemjs'))
        .use(express.static('./node_modules/rxjs'))
        .use(express.static('./node_modules/soundcloud'))

        .use(bodyParser.urlencoded({extended: true}))
        .use(bodyParser.json());

    server.all('*',
        function (req, res) {
            res.redirect('/');
        }
    );
};