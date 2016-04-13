import { Injectable } from 'angular2/core';
import { Subject } from "rxjs/Subject";

declare let SC:any;

@Injectable()
export class SoundCloudService
{
    private _soundcloud:Subject<{}> = new Subject<{}>();
    observable$ = this._soundcloud.asObservable();
    
    private _clientId:string = '8a834fccc443cc9d97237b5ee7ed36ca';
    private _redirectUri:string = 'http://localhost:3000/callback.html';
    private _user:any = [];
    private _followings:any;
    
    constructor()
    {
        SC.initialize( {
            client_id: this._clientId,
            redirect_uri: this._redirectUri
        } );
    }
    
    get user():string
    {
        return this._user;
    }
    
    get followings():string
    {
        return this._followings;
    }
    
    resolveUser( username:string )
    {
        SC.get( '/resolve?url=http://soundcloud.com/' + username )
            .then( ( response:any ) =>
            {
                this._user = response;
                this._soundcloud.next( { user: true } );
            } );
    }
    
    getAllFollowings( username:string )
    {
        let collect = ( userId:string ) =>
        {
            SC.get( '/users/' + userId + '/followings' )
                .then( response =>
                {
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
                                    this._soundcloud.next( { followings: false, error: error } );
                                } );
                        }
                        else
                        {
                            this._followings = followings;
                            this._soundcloud.next( { followings: true } );
                        }
                    };
                    parseResponse( response );
                }, error =>
                {
                    console.log( error );
                } );
        };
        if ( this._user )
        {
            console.log( this._user );
            collect( this._user.id );
        }
        else
        {
            SC.get( '/resolve?url=http://soundcloud.com/' + username )
                .then( ( response:any ) =>
                {
                    collect( response.id );
                } );
        }
    }
}