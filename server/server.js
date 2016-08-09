var express = require( 'express' );
var http = require( 'http' );
var mongoose = require( 'mongoose' );

var server = express();

mongoose.connect( 'mongodb://DELETED/heroku_xfj113tp/followings', function( error )
{
    if ( error )
    {
        console.log( error.toString() );
    }
    else
    {
        console.log( 'Connected to MongoDB.' );
    }
} );

var port = process.env.PORT || 3000;

http.createServer( server ).listen( port );

require( './models/models.js' );
require( './routes/routes.js' )( server );

console.log( 'Server now listening on port ' + port );
