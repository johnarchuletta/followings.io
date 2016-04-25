var crypto = require( 'crypto' );
var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User', User );
var dateFormat = require( 'dateformat' );

exports.login = function( req, res )
{
    var username = req.body.username;
    var password = hashPassword( req.body.password );
    
    User.findOne( { username: username, password: password }, function( error, found )
    {
        if ( found )
        {
            console.log( '*** USER "' + found.username + '" LOGGED IN ['+ dateFormat(new Date()) +'] ***' );
            req.session.regenerate( function()
            {
                req.session.username = found.username;
                req.session.msg = 'Authenticated as ' + found.username;
            } );
            res.send( {
                success: true,
                message: 'login successful',
                user: found
            } );
        }
        else
        {
            console.log( '*** FAILED LOGIN FOR "' + username + '" ***' );
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
                created: dateFormat( new Date() ),
                username: username,
                password: password,
                email: email,
                soundcloudUrl: soundcloudUrl,
                followings: ''
            } );
            newUser.save( function( error, saved )
            {
                if ( saved )
                {
                    console.log( '*** USER "' + username + '" CREATED ***' );
                    console.log( saved );
                    res.send( { success: true } );
                }
                else
                {
                    console.log( '*** ERROR CREATING USER ***' );
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

exports.followings = function( req, res )
{
    var username = req.body.username;
    if ( req.body.followings )
    {
        var followings = JSON.stringify( req.body.followings );
    }

    // user is requesting followings
    if ( username && !followings )
    {
        User.findOne( { username: username }, function( error, found )
        {
            if ( found )
            {
                if ( found.followings != '' )
                {
                    res.send( { followings: JSON.parse( found.followings ) } );
                }
                else
                {
                    res.send( { followings: false } );
                }
            }
            else
            {
                res.send( { success: false } );
            }
        } );
    }
    // user is updating followings
    else if ( username && followings )
    {
        User.update( { username: username }, { followings: followings }, function( error, success )
        {
            if ( success )
            {
                res.send( { saveFollowings: true } );
            }
            else
            {
                res.send( { saveFollowings: false } );
            }
        } );
    }
};

exports.soundcloud = function( req, res )
{
    var username = req.body.username;
    if ( req.body.soundcloudUser )
    {
        var soundcloudUser = req.body.soundcloudUser;
    }

    // user is retrieving soundcloud user information
    if ( username && !soundcloudUser )
    {
        User.findOne( { username: username }, function( error, found )
        {
            if ( found.soundcloudUser )
            {
                res.send( { soundcloudUser: found.soundcloudUser } )
            }
            else
            {
                res.send( { soundcloudUser: false } )
            }
        } );
    }
    // user is updating soundcloud user information
    else if ( username && soundcloudUser )
    {
        User.update( { username: username }, { soundcloudUser: JSON.stringify( soundcloudUser ) }, function( error, success )
        {
            if ( !error )
            {

                res.send( { saveSoundcloudUser: true } );
            }
            else
            {
                res.send( { saveSoundcloudUser: false } );
            }
        } )
    }
};

function hashPassword( password )
{
    return crypto.createHash( 'sha256' ).update( password ).digest( 'base64' ).toString();
}