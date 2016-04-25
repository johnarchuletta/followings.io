import { Injectable } from 'angular2/core';
import { Subject } from "rxjs/Subject";

declare let SC:any;

@Injectable()
export class SoundCloudService
{
    // create observable for clients to subscribe to
    private _update:Subject<{}> = new Subject<{}>();
    observable$ = this._update.asObservable();
    
    // data for soundcloud api services
    private _clientId:string = '8a834fccc443cc9d97237b5ee7ed36ca';
    private _redirectUri:string = 'http://localhost:3000/callback.html';
    
    // variables to hold soundcloud data
    private _user:any;
    private _followings:any;
    
    constructor()
    {
        SC.initialize( {
            client_id: this._clientId,
            redirect_uri: this._redirectUri
        } );
    }
    
    get user():any
    {
        return this._user;
    }
    
    get followings():any
    {
        return this._followings;
    }
    
    set user( user:any )
    {
        this._user = user;
    }
    
    set followings( followings:any )
    {
        this._followings = followings;
    }
    
    clearData()
    {
        this._user = null;
        this._followings = null;
        this._update.next( { 'clear': true } );
    }
    
    resolveUser( username:string )
    {
        SC.get( '/resolve?url=http://soundcloud.com/' + username + '&client_id=' + this._clientId )
            .then( ( response:any ) =>
            {
                this._user = response;
                this._update.next( { resolveUser: true } );
            } );
    }
    
    getAllFollowings( username:string )
    {
        let collect = ( userId:string ) =>
        {
            SC.get( '/users/' + userId + '/followings' )
                .then( response =>
                {
                    console.log( 'do we get here?????' );
                    let followings:any = [];
                    
                    let parseResponse = ( response:any ) =>
                    {
                        if ( response.collection.length > 0 )
                        {
                            for( let i = 0; i < response.collection.length; i++ )
                            {
                                followings.push( response.collection[ i ] );
                            }
                        }
                        
                        if ( response.next_href )
                        {
                            SC.get( response.next_href.slice( 27, response.next_href.length ) )
                                .then( response =>
                                {
                                    parseResponse( response );
                                }, error =>
                                {
                                    this._update.next( { followings: false, error: error } );
                                } );
                        }
                        else
                        {
                            this._followings = followings;
                            this._update.next( { followings: true } );
                        }
                    };
                    parseResponse( response );
                }, error =>
                {
                    console.log( error );
                } );
        };
        console.log( 'resolving sc user: /resolve?url=http://soundcloud.com/' + username + '&client_id=' + this._clientId );
        SC.get( '/resolve?url=http://soundcloud.com/' + username + '&client_id=' + this._clientId )
            .then( ( response:any ) =>
            {
                console.log( response );
                this._user = response;
                this._update.next( { resolveUser: true } );
                collect( response.id );
            }, error =>
            {
                console.log( error );
            } );
    }
}