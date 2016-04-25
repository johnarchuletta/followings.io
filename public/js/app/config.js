System.config( {
    packages: {
        'js/app': {
            format: 'register',
            defaultExtension: 'js'
        }
    }
} );

System.import( './js/app/boot' ).then( null, console.error.bind( console ) );