import { Component, OnInit, OnDestroy } from "angular2/core";
import { Http } from "angular2/http";

import { Subscription } from "rxjs/Subscription";

import { AppService } from "../../services/app/app.service";
import { UserService } from "../../services/user/user.service";
import { SoundCloudService } from "../../services/soundcloud/soundcloud.service";
import { HearThisService } from "../../services/hearthis/hearthis.service";
import { MixCloudService } from "../../services/mixcloud/mixcloud.service";

import { FadeInDirective } from "../../directives/fade-in/fade-in.directive";

@Component( {
    selector: '[search]',
    templateUrl: 'js/app/components/search/search.component.html',
    directives: [ FadeInDirective ]
} )

export class SearchComponent implements OnInit, OnDestroy
{
    soundcloudUser:any;
    soundcloudFollowings:any;

    mixcloudServiceSubscription:Subscription;
    hearthisServiceSubscription:Subscription;
    
    searching:boolean = false;
    searched:boolean = false;
    mixcloudIndex:number = 0;
    hearthisIndex:number = 0;
    
    constructor( private _userService:UserService,
                 private _soundcloudService:SoundCloudService,
                 private _mixcloudService:MixCloudService,
                 private _hearthisService:HearThisService )
    {
        // constructor
    }
    
    ngOnInit()
    {
        this.soundcloudFollowings = this._soundcloudService.followings;
        
        this.mixcloudServiceSubscription = this._mixcloudService.observable$.subscribe( ( data:any ) =>
        {
            this.mixcloudUpdate( data );
        } );
        
        this.hearthisServiceSubscription = this._hearthisService.observable$.subscribe( ( data:any ) =>
        {
            this.hearthisUpdate( data );
        } )
    }

    ngOnDestroy()
    {
        this.mixcloudServiceSubscription.unsubscribe();
        this.hearthisServiceSubscription.unsubscribe();
    }
    
    mixcloudUpdate( data:any )
    {
        if ( data.searchIndex )
        {
            this.mixcloudIndex = data.searchIndex + 1;
        }
        else if ( data.doneSearching )
        {
            this.searching = false;
            this.searched = true;
        }
    }
    
    hearthisUpdate( data:any )
    {
        if ( data.doneSearching )
        {
            this.searching = false;
            this.searched = true;
        }
        else if ( data.rateLimit )
        {
            console.log( 'HearThis rate limit reached at index ' + this.hearthisIndex );
        }
        else if ( data.error )
        {
            console.log( data.error );
        }
        else if ( data.searchIndex )
        {
            this.hearthisIndex = this.hearthisIndex + 1;
        }
    }
    
    searchMixCloud()
    {
        console.log( 'Now searching MixCloud...' );
        this.searching = true;
        this._mixcloudService.search( this.soundcloudFollowings );
    }
    
    searchHearThis()
    {
        this.searching = true;
        this._hearthisService.search( this.soundcloudFollowings );
    }
    
    saveFollowings()
    {
        this.searched = false;
        this._userService.saveFollowings( this.soundcloudFollowings );
    }
}