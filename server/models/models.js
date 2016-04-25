var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

var User = new Schema( {
    created: {
        type:String,
        required: [true, 'no create date supplied']
    },
    username: {
        type: String,
        required: [ true, 'username required' ],
        validate: {
            validator: function( username )
            {
                return /^[a-zA-Z0-9_-]{3,16}$/.test( username );
            },
            message: 'invalid username'
        }
    },
    password: {
        type: String,
        required: [ true, 'Password required' ],
        min: [ 44, 'invalid password' ]
    },
    email: {
        type: String,
        required: [ true, 'email required' ],
        validate: {
            validator: function( email )
            {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test( email );
            },
            message: 'invalid password'
        }
    },
    soundcloudUrl: {
        type: String,
        required: [ true, 'soundcloud url required' ],
        validate: {
            validator: function( username )
            {
                return /^[a-zA-Z0-9_-]{3,24}$/.test( username );
            },
            message: 'invalid soundcloud url'
        }
    },
    soundcloudUser: {
        type: String
    },
    followings: {
        type: String
    }
} );

mongoose.model( 'User', User );