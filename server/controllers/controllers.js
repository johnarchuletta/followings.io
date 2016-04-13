var crypto = require( 'crypto' );
var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User', User );

exports.login = function( req, res )
{
    var username = req.body.username;
    var password = hashPassword( req.body.password );
    
    User.findOne( { username: username, password: password }, function( error, found )
    {
        if ( found )
        {
            console.log( '*** User ' + found.username + ' logged in ***' );
            req.session.regenerate( function()
            {
                req.session.username = found.username;
                req.session.msg = 'Authenticated as ' + found.username;
            } );
            res.send( {
                success: true,
                message: 'login successful',
                user: {
                    username: found.username,
                    password: found.password,
                    email: found.email,
                    soundcloudUrl: found.soundcloudUrl
                }
            } );
        }
        else
        {
            res.send( { success: false, message: 'login failed' } );
        }
    } );
};

exports.register = function( req, res )
{
    var username = req.body.username;
    var password = hashPassword( req.body.password );
    var email = req.body.email;
    var soundcloudUrl = req.body.soundcloudUrl;
    
    User.findOne( { username: username }, function( error, found )
    {
        if ( !found )
        {
            var newUser = new User( {
                username: username,
                password: password,
                email: email,
                soundcloudUrl: soundcloudUrl
            } );
            newUser.save( function( error, saved )
            {
                if ( saved )
                {
                    console.log( '*** User successfully created ***' );
                    console.log( saved );
                    res.send( {
                        success: true,
                        message: 'registration successful',
                        username: saved.username,
                        password: saved.password,
                        email: saved.email,
                        soundcloudUrl: saved.soundcloudUrl
                    } );
                }
                else
                {
                    console.log( '*** Error creating appUser ***' );
                    console.log( error );
                    res.send( { success: false, message: error } );
                }
            } );
        }
        else
        {
            res.send( { success: false, message: 'username taken' } );
        }
    } );
};

function hashPassword( password )
{
    return crypto.createHash( 'sha256' ).update( password ).digest( 'base64' ).toString();
}