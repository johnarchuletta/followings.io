var express = require( 'express' );
var mongoose = require( 'mongoose' );
var bodyParser = require( 'body-parser' );
var cookieParser = require( 'cookie-parser' );
var expressSession = require( 'express-session' );
var mongoStore = require( 'connect-mongo' )( { session: expressSession } );

module.exports = function( server )
{
    var controllers = require( '../controllers/controllers.js' );
    
    server
        .set( 'views', './public' )
        .engine( 'html', require( 'ejs' ).renderFile )
        
        .use( express.static( './public' ) )
        .use( express.static( './node_modules/angular2' ) )
        .use( express.static( './node_modules/systemjs' ) )
        .use( express.static( './node_modules/rxjs' ) )
        .use( express.static( './node_modules/soundcloud' ) )
        .use( express.static( './node_modules/bootstrap-sass/assets/' ) )
        
        .use( bodyParser.urlencoded( { extended: true } ) )
        .use( bodyParser.json() )
        .use( cookieParser() )
        .use( expressSession( {
            secret: 'Cje9SjaI0',
            cookie: { maxAge: 60 * 60 * 1000 },
            saveUninitialized: true,
            resave: true,
            store: new mongoStore( {
                mongooseConnection: mongoose.connection,
                collection: 'sessions'
            } )
        } ) );
    
    server.post( '/login', controllers.login );
    server.post( '/register', controllers.register );
    
    server.all( '*', function( req, res )
    {
        res.redirect( '/' );
    } );
};