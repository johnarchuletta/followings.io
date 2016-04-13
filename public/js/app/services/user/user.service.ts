import { Injectable } from 'angular2/core';
import { Subject } from "rxjs/Subject";
import { Http, Headers } from "angular2/http";
import { AppService } from "../app/app.service";

@Injectable()
export class UserService
{
    private _userUpdate:Subject<{}> = new Subject<{}>();
    observable$ = this._userUpdate.asObservable();
    
    private _user:{};
    
    constructor( private _http:Http,
                 private _appService:AppService )
    {
        // Do nothing
    }
    
    get user():{}
    {
        return this._user;
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
                    this._userUpdate.next( { login: true } );
                }
                else
                {
                    this._appService.loginStatus = false;
                    this._userUpdate.next( { login: false, message: response.message } );
                }
            } )
    }
    
    register( username:string, password:string, email:string, soundcloudUrl:string )
    {
        
        return this._http.request( '/register', {
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
        } );
    }
}