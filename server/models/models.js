var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

var User = new Schema( {
    username: {
        type: String,
        required: [ true, 'Username required' ],
        validate: {
            validator: function( username )
            {
                return /^[a-zA-Z0-9_-]{3,16}$/.test( username );
            },
            message: 'Invalid username'
        }
    },
    password: {
        type: String,
        required: [ true, 'Password required' ],
        min: [ 44, 'Invalid password' ]
    },
    email: {
        type: String,
        required: [ true, 'Email required' ],
        validate: {
            validator: function( email )
            {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test( email );
            },
            message: 'Invalid password'
        }
    },
    soundcloudUrl: {
        type: String,
        required: [ true, 'SoundCloud URL required' ],
        validate: {
            validator: function( username )
            {
                return /^[a-zA-Z0-9_-]{3,24}$/.test( username );
            },
            message: 'Invalid SoundCloud URL'
        }
    }
} );

mongoose.model( 'User', User );