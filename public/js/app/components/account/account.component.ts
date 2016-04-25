import { Component, OnDestroy, OnInit } from "angular2/core";
import { Router } from "angular2/router";

import { Subscription } from "rxjs/Subscription";

import { AppService } from "../../services/app/app.service";
import { UserService } from "../../services/user/user.service";
import { SoundCloudService } from "../../services/soundcloud/soundcloud.service";

import { FadeInDirective } from "../../directives/fade-in/fade-in.directive";
import { TooltipDirective } from "../../directives/tooltip/tooltip-directive";

@Component( {
    selector: '[account]',
    templateUrl: 'js/app/components/account/account.component.html',
    directives: [FadeInDirective, TooltipDirective]
} )

export class AccountComponent implements OnInit, OnDestroy
{
    // app user data
    appUser:any;
    
    // soundcloud user data
    soundcloudUser:any;
    soundcloudFollowings:any;
    
    // template variables
    showLoadingNotification:boolean = false;
    followingsLoadError:boolean = false;

    //
    soundcloudServiceSubscription:Subscription;
    userServiceSubscription:Subscription;
    
    constructor( private _appService:AppService,
                 private _userService:UserService,
                 private _soundcloudService:SoundCloudService,
                 private _router:Router)
    {
        // Constructor
    }

    ngOnInit() {
        // grab account information from user service
        this.appUser = this._userService.user;

        // subscribe to SoundCloudService event updates
        this.soundcloudServiceSubscription = this._soundcloudService.observable$.subscribe( data =>
        {
            console.log( '[AccountComponent] SoundCloudService update received:' );
            console.log( data );
            this.soundcloudUpdate( data );
        } );

        this.userServiceSubscription = this._userService.observable$.subscribe( data =>
        {
            this.userUpdate( data );
        } );

        // has the soundcloud user and followings been retrieved yet?
        if ( this._soundcloudService.followings && this._soundcloudService.user )
        { // yes
            this.soundcloudUser = this._soundcloudService.user;
            this.soundcloudFollowings = this._soundcloudService.followings;
        }
        else
        { // no
            // check if user has a stored version of their followings in our database
            this._userService.getSavedFollowings();
        }
    }
    
    ngOnDestroy()
    {
        // unsubscribe from service updates
        this.soundcloudServiceSubscription.unsubscribe();
        this.userServiceSubscription.unsubscribe();
    }
    
    userUpdate( data:any )
    {
        if ( data.getSavedFollowings )
        {
            // user has followings stored
            this.soundcloudFollowings = data.getSavedFollowings;
            this._soundcloudService.followings = data.getSavedFollowings;
            this._userService.getSoundCloudUser();
        }
        else if ( data.getSavedFollowings === false )
        {
            // user does not have followings stored, retrieve them from soundcloud
            this.showLoadingNotification = true;
            this._soundcloudService.getAllFollowings( this.appUser.soundcloudUrl );
        }
        else if ( data.saveFollowings )
        {
            console.log( 'User followings saved to database' );
        }
        else if ( data.saveFollowings === false )
        {
            console.log( 'User followings not saved to database' );
        }
        else if ( data.getSoundCloudUser )
        {
            this._soundcloudService.user = data.getSoundCloudUser;
            this.soundcloudUser = data.getSoundCloudUser;
        }
        else if ( data.getSoundCloudUser === false )
        {
            this._soundcloudService.resolveUser( this.appUser.soundcloudUrl );
        }
        else if ( data.saveSoundcloudUser )
        {
            console.log( 'SoundCloud user data saved to database' );
        }
        else if ( data.saveSoundcloudUser === false )
        {
            console.log( 'Could not save SoundCloud user data to database' );
        }
    }
    
    soundcloudUpdate( data:any )
    {
        if ( data.resolveUser )
        { // soundcloud user retrieved
            this.soundcloudUser = this._soundcloudService.user;
            this._userService.saveSoundCloudUser( this._soundcloudService.user );
        }
        else if ( data.followings )
        { // followings retrieved successfully
            this.showLoadingNotification = false;
            this.soundcloudFollowings = this._soundcloudService.followings;
            this._userService.saveFollowings( this._soundcloudService.followings );
        } // error retrieving followings
        else if ( data.followings === false )
        {
            this.showLoadingNotification = false;
            this.followingsLoadError = true;
        }
    }
    
    getSoundCloudFollowings()
    {
        // clear followings variable
        this.soundcloudFollowings = null;
        
        // show loading notification in view
        this.showLoadingNotification = true;

        // tell service to retrieve followings
        this._soundcloudService.getAllFollowings( this.appUser.soundcloudUrl );
    }
    
    logOut()
    {
        // clear session data
        sessionStorage.setItem( 'username', '' );
        sessionStorage.setItem( 'password', '' );

        // clear component data
        this.appUser = null;
        this.soundcloudUser = null;
        this.soundcloudFollowings = null;
        
        // clear data in services
        this._userService.clearData();
        this._soundcloudService.clearData();
        
        // set app login status to false
        this._appService.loginStatus = false;
        
        // navigate user to login screen
        this._router.navigate( [ 'Login' ] );
    }
}