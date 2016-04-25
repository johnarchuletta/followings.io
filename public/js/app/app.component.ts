import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AppService } from './services/app/app.service';
import { UserService } from './services/user/user.service';

import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';

import { FadeInDirective } from './directives/fade-in/fade-in.directive';
import { SoundCloudService } from './services/soundcloud/soundcloud.service';
import { HearThisService } from './services/hearthis/hearthis.service';
import { SearchComponent } from './components/search/search.component';
import { MixCloudService } from './services/mixcloud/mixcloud.service';
import { BrowserDomAdapter } from "angular2/src/platform/browser/browser_adapter";

@Component( {
    selector: 'app',
    templateUrl: 'js/app/app.component.html',
    styleUrls: [ 'js/app/app.component.css' ],
    directives: [
        ROUTER_DIRECTIVES,
        FadeInDirective,
        NavigationComponent,
        LoginComponent,
        RegisterComponent,
        AccountComponent,
        SearchComponent
    ],
    providers: [
        BrowserDomAdapter,
        AppService,
        UserService,
        SoundCloudService,
        HearThisService,
        MixCloudService
    ]
} )

@RouteConfig(
    [
        {
            name: 'Login',
            component: LoginComponent,
            path: '/'
        },
        {
            name: 'Register',
            component: RegisterComponent,
            path: '/register'
        },
        {
            name: 'Followings',
            component: AccountComponent,
            path: '/followings'
        },
        {
            name: 'Search',
            component: SearchComponent,
            path: '/search'
        }
    ] )

export class AppComponent
{
    loginStatus:boolean = false;
    currentSection:string = 'login';
    
    constructor( private _appService:AppService )
    {
        this._appService.observable$.subscribe( ( object:any ) =>
        {
            this.appUpdate( object );
        } );
    }
    
    appUpdate( update:any )
    {
        if ( update.currentSection )
        {
            this.currentSection = update.currentSection;
        }
    }
}