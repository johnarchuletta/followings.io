import { Component } from 'angular2/core';
import { BrowserDomAdapter } from 'angular2/platform/browser';
import { JSONP_PROVIDERS, Http, Headers } from 'angular2/http';
import { Observable } from "rxjs/Observable";
import { SoundCloudService } from '../../services/soundcloud/soundcloud.service';
import { HearThisService } from '../../services/hearthis/hearthis.service';
import { FadeInDirective } from '../../directives/fade-in/fade-in.directive';
import { LoginComponent } from '../../components/login/login.component';

declare var SC:any;

@Component( {
    directives: [ FadeInDirective, LoginComponent ],
    providers: [ JSONP_PROVIDERS, SoundCloudService, HearThisService ],
    templateUrl: 'js/app/components/main/main.component.html',
    styleUrls: [ 'js/app/components/main/main.component.css' ]
} )

export class MainComponent
{
    // Global objects
    dom:BrowserDomAdapter = new BrowserDomAdapter;
    htUserSearch$:Observable<{}>;
    FollowingsStatus = FollowingsStatus; // DO NOT DELETE
    Section = Section; // DO NOT DELETE
    
    // Template variables
    step:number = 1;
    htRateLimitReached:boolean = false;
    
    // State variables
    fs:FollowingsStatus = FollowingsStatus.empty;
    
    // SoundCloud data
    username:string = 'arc1';
    user:any = [];
    followings:any = [];
    
    //Session data
    loggedIn:boolean = false;
    
    //State data
    section:Section = Section.login;
    
    //Login data
    loginUsername:string = '';
    loginPassword:string = '';
    
    //Register data
    registerUsername:string = '';
    registerPassword:string = '';
    registerPassword2:string = '';
    registerEmail:string = '';
    registerScurl:string = '';
    
    constructor( private _http:Http,
                 private _soundcloud:SoundCloudService,
                 private _ht:HearThisService )
    {
        
    }
    
    getSCFollowings()
    {
        if ( this.username != null && this.username != '' )
        {
            this.fs = FollowingsStatus.retrieving; // Notify template of state
            this._soundcloud.getAllFollowings( this.username )
                .then( data =>
                {
                    this.user = data[ 0 ]; // The first object in array is always user info
                    this.followings = data[ 1 ]; // Second object is followings array
                    this.fs = FollowingsStatus.retrieved;
                }, error =>
                {
                    console.log( error );
                    this.fs = FollowingsStatus.error;
                } )
        }
        else
        {
            this.fs = FollowingsStatus.noUsername;
        }
    }
    
    findHTUsers()
    {
        this.htUserSearch$ = this._ht.findHTUsers( this.followings );
        this.htUserSearch$
            .subscribe( ( data:any ) =>
            {
                if ( data === 'RATE' )
                {
                    this.htRateLimitReached = true;
                }
            }, ( error:any ) =>
            {
                console.log( error );
            } );
    }
    
    login()
    {
        let self = this;
        let body = 'username=' + this.loginUsername + '&password=' + this.loginPassword;
        let headers = new Headers();
        
        headers.append( 'Content-Type', 'application/x-www-registerForm-urlencoded' );
        
        this._http.post( '/login', body, { headers: headers } )
            .map( res => res.json() )
            .subscribe( ( data ) =>
            {
                console.log( data );
                if ( data.success === true )
                {
                    self.section = Section.followings;
                }
                else
                {
                    console.log( 'User not found.' );
                }
            }, ( error ) =>
            {
                console.log( error.success );
            } )
    }
    
    register()
    {
        let body = 'username=' + this.registerUsername + '&password=' + this.registerPassword;
        let headers = new Headers();
        
        headers.append( 'Content-Type', 'application/x-www-registerForm-urlencoded' );
        
        this._http.post( '/register', body, { headers: headers } )
            .map( res => res.json() )
            .subscribe( ( data ) =>
            {
                console.log( data.success );
            }, ( error ) =>
            {
                console.log( error.success );
            } )
    }
    
    setSection( section:string, fromSection?:string, event?:any )
    {
        if ( event ) event.preventDefault();
        
        if ( section === 'login' )
        {
            this.section = Section.login;
        }
        else if ( section === 'register' )
        {
            this.section = Section.register;
            
        }
    }
}

//------------------------------------------------------------------------------------------------------------------

enum Section {
    register,
    login,
    followings,
    search,
    settings,
    account,
    splash
}

enum FollowingsStatus {
    empty,
    retrieving,
    retrieved,
    noUsername,
    error
}