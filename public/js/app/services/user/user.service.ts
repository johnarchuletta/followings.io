import { Injectable } from 'angular2/core';
import { Subject } from "rxjs/Subject";
import { Http, Headers } from "angular2/http";
import { AppService } from "../app/app.service";

@Injectable()
export class UserService
{
    private _update:Subject<{}> = new Subject<{}>();
    observable$ = this._update.asObservable();
    
    private _user:any;
    
    constructor( private _http:Http,
                 private _appService:AppService )
    {
        // constructor
    }
    
    get user():{}
    {
        return this._user;
    }

    clearData()
    {
        this._user = null;
        this._update.next( { 'reset': true } );
    }
    
    login( username:string, password:string )
    {
        let headers = new Headers;
        let body = JSON.stringify( {
            username: username,
            password: password
        } );
        
        headers.append( 'Content-Type', 'application/json' );

        this._http.post( '/login', body, { headers: headers } )
            .map( res => res.json() )
            .subscribe( ( response ) =>
            {
                if ( response.success )
                {
                    this._user = response.user;
                    this._appService.loginStatus = true;
                    this._update.next( { login: true } );
                }
                else
                {
                    this._appService.loginStatus = false;
                    this._update.next( { login: false, message: response.message } );
                }
            } )
    }
    
    register( username:string, password:string, email:string, soundcloudUrl:string )
    {
        
        this._http.request( '/register', {
                method: 'POST',
                headers: new Headers( {
                    'Content-Type': 'application/json'
                } ),
                body: JSON.stringify( {
                    username: username,
                    password: password,
                    email: email,
                    soundcloudUrl: soundcloudUrl
                } )
            } )
            .map( res => res.json() )
            .subscribe( data =>
            {
                console.log(data);
                if ( data.success )
                {
                    this.login( username, password );
                    this._update.next( { register: true } );
                }
                else
                {
                    this._update.next( { register: false } );
                }
            }, ( error ) =>
            {
                console.log( error );
            } )
    }

    getSavedFollowings()
    {
        this._http.request( '/followings', {
                method: 'POST',
                headers: new Headers( {
                    'Content-Type': 'application/json'
                } ),
                body: JSON.stringify( {
                    username: this._user.username,
                } )
            } )
            .map( res => res.json() )
            .subscribe( data =>
            {
                console.log('BOOM--------');
                if ( data.followings != '' )
                {
                    this._update.next( { getSavedFollowings: data.followings } );
                }
                else
                {
                    this._update.next( { getSavedFollowings: false } );
                }
            } )
    }

    saveFollowings( followings:any )
    {
        this._http.request( '/followings', {
                method: 'POST',
                headers: new Headers( {
                    'Content-Type': 'application/json'
                } ),
                body: JSON.stringify( {
                    username: this._user.username,
                    followings: followings
                } )
            } )
            .map( res => res.json() )
            .subscribe( data =>
            {
                if ( data.saveFollowings )
                {
                    this._update.next( { saveFollowings: true } );
                }
                else
                {
                    this._update.next( { saveFollowings: false } );
                }
            } )
    }

    getSoundCloudUser()
    {
        this._http.request( '/soundcloud', {
                method: 'POST',
                headers: new Headers( {
                    'Content-Type': 'application/json'
                } ),
                body: JSON.stringify( {
                    username: this._user.username,
                } )
            } )
            .map( res => res.json() )
            .subscribe( data =>
            {
                if ( data.soundcloudUser )
                {
                    this._update.next( { getSoundCloudUser: JSON.parse( data.soundcloudUser ) } );
                }
                else
                {
                    this._update.next( { getSoundCloudUser: false } );
                }
            } )
    }

    saveSoundCloudUser( soundcloudUser:any )
    {
        this._http.request( '/soundcloud', {
                method: 'POST',
                headers: new Headers( {
                    'Content-Type': 'application/json'
                } ),
                body: JSON.stringify( {
                    username: this._user.username,
                    soundcloudUser: soundcloudUser
                } )
            } )
            .map( res => res.json() )
            .subscribe( data =>
            {
                if ( data.saveSoundcloudUser )
                {
                    this._update.next( { saveSoundcloudUser: true } );
                }
                else
                {
                    this._update.next( { saveSoundcloudUser: false } );
                }
            } )
    }
}