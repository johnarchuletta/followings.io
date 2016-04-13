import { Component } from "angular2/core";

import { UserService } from "../../services/user/user.service";
import { SoundCloudService } from "../../services/soundcloud/soundcloud.service";

@Component( {
    selector: '[account]',
    templateUrl: 'js/app/components/account/account.component.html',
    styleUrls: [ 'js/app/components/account/account.component.css' ],
    providers: [ SoundCloudService ],
} )

export class AccountComponent
{
    lines:string[] = [ 'one', 'two', 'three', 'four' ];
    appUser:any;
    soundcloudUser:any;
    soundcloudFollowings:any;
    wait:boolean = false;
    followingsLoadError:boolean = false;
    
    constructor( private _userService:UserService,
                 private _soundcloudService:SoundCloudService )
    {
        this.appUser = this._userService.user;
        this._soundcloudService.observable$.subscribe( data =>
        {
            this.updateSoundcloud( data );
        } );
        this._soundcloudService.resolveUser( this.appUser.soundcloudUrl );
    }
    
    getSoundCloudFollowings()
    {
        this.wait = true;
        this._soundcloudService.getAllFollowings( this.soundcloudUser.id );
    }
    
    updateSoundcloud( data:any )
    {
        if ( data.user )
        {
            this.soundcloudUser = this._soundcloudService.user;
        }
        else if ( data.followings )
        {
            this.wait = false;
            this.soundcloudFollowings = this._soundcloudService.followings;
        }
        else if ( !data.followings )
        {
            this.wait = false;
            this.followingsLoadError = true;
        }
    }
}