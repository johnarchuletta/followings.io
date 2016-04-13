import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class HearThisService
{
    constructor( private http:Http )
    {
        // Do Nothing
    }
    
    findHTUsers( followings:any )
    {
        return new Observable( observer =>
        {
            // Notify controller search has begun
            console.log( 'SEARCHING FOR HT USERS' );
            observer.next( 'SEARCHING' );
            let startTime:number = Date.now();
            // This function will send requests to HearThis for each object in the followings array
            let search = ( index:number ) =>
            {
                let url:string = 'https://api-v2.hearthis.at/search?type=user&t=' + encodeURI( followings[ index ].username );
                this.http.get( url )
                    .map( ( data:any ) => data.json() )
                    .subscribe( ( data:any ) =>
                    {
                        // Handle response from HT user request
                        let handleData = ( data:any ) =>
                        {
                            if ( data != null )
                            {
                                // If array length is greater than 0, check first match
                                if ( data.length > 0 )
                                {
                                    
                                    // Search all matches returned for an exact match
                                    for( let i = 0; i < data.length; i++ )
                                    {
                                        // Store HT & SC permalink into variables
                                        let username:string = followings[ index ].permalink;
                                        let match:string = '';
                                        
                                        if ( data[ i ].permalink != null )
                                        {
                                            match = data[ i ].permalink;
                                        }
                                        
                                        console.log( username + ' => ' + match );
                                        
                                        // Compare HT permalink against SC permalink
                                        if ( match.length === username.length && match === username )
                                        {
                                            // Found user
                                            followings[ index ][ 'ht_permalink' ] = data[ i ].permalink;
                                            observer.next( { 'found': true, 'index': index } );
                                        }
                                        else
                                        {
                                            // User not Found
                                            followings[ index ][ 'ht_permalink' ] = '';
                                            observer.next( { 'found': false, 'index': index } );
                                        }
                                    }
                                }
                                else
                                {
                                    
                                    // data array length is 0, but a single object may have been returned with rate limit info
                                    if ( data.success === false )
                                    {
                                        // HT rate limit reached
                                        let elapsedTime:number = Date.now() - startTime;
                                        let duration = this.msToStr( elapsedTime );
                                        console.log( 'RATE LIMIT REACHED / ' + index + ' / ' + duration );
                                        index = followings.length;
                                        observer.next( 'RATE' );
                                    }
                                    else
                                    {
                                        // Empty array returned, thus no match found
                                        console.log( '' );
                                        followings[ index ][ 'ht_permalink' ] = '';
                                        observer.next( { 'found': false, 'index': index } );
                                    }
                                }
                            }
                            else
                            {
                                console.log( 'ERROR(' + index + '): ' + Date.now() );
                                index = followings.length;
                                observer.next( 'ERROR' );
                            }
                        };
                        
                        // Handle response sent back from HT
                        handleData( data );
                        
                        // Increment array index
                        index++;
                        
                        // If index is less than followings.length, send next request
                        if ( index < followings.length )
                        {
                            setTimeout( () =>
                            {
                                search( index );
                            }, 0 )
                        }
                        else
                        {
                            let elapsedTime:number = Date.now() - startTime;
                            let duration = this.msToStr( elapsedTime );
                            console.log( 'DONE SEARCHING / ' + duration );
                        }
                    }, error =>
                    {
                        observer.next( error );
                    } )
            };
            search( 0 ); // Initiate recursive query to HearThis starting at followings[0]
        } );
    }
    
    msToStr( milliseconds )
    {
        function numberEnding( number )
        {
            return (number > 1) ? 's' : '';
        }
        
        var temp = Math.floor( milliseconds / 1000 );
        var years = Math.floor( temp / 31536000 );
        if ( years )
        {
            return years + ' year' + numberEnding( years );
        }
        var days = Math.floor( (temp %= 31536000) / 86400 );
        if ( days )
        {
            return days + ' day' + numberEnding( days );
        }
        var hours = Math.floor( (temp %= 86400) / 3600 );
        if ( hours )
        {
            return hours + ' hour' + numberEnding( hours );
        }
        var minutes = Math.floor( (temp %= 3600) / 60 );
        if ( minutes )
        {
            return minutes + ' minute' + numberEnding( minutes );
        }
        var seconds = temp % 60;
        if ( seconds )
        {
            return seconds + ' second' + numberEnding( seconds );
        }
        return 'less than a second'; //'just now' //or other string you like;
    }
}