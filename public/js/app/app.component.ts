import {Component, AfterViewInit} from 'angular2/core';
import {FORM_DIRECTIVES} from "angular2/common";

import {AppService} from "./services/app/app.service";
import {UserService} from "./services/user/user.service";

import {NavigationComponent} from './components/navigation/navigation.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AccountComponent} from "./components/account/account.component";

import {FadeInDirective} from "./directives/fade-in/fade-in.directive";

@Component({
    selector: 'app',
    templateUrl: 'js/app/app.component.html',
    styleUrls: ['js/app/app.component.css'],
    directives: [
        FORM_DIRECTIVES,
        FadeInDirective,
        NavigationComponent,
        LoginComponent,
        RegisterComponent,
        AccountComponent,
    ],
    providers: [AppService, UserService]
})

export class AppComponent implements AfterViewInit
{
    loginStatus:boolean = false;
    currentSection:string = 'login';
    
    constructor(private _appService:AppService,
                private _userService:UserService)
    {
        this._appService.observable$.subscribe((object:any) =>
        {
            this.appUpdate(object);
        });
        this._userService.observable$.subscribe((object:any) =>
        {
            this.userUpdate(object);
        });
    }
    
    appUpdate(update:any)
    {
        if(update.currentSection)
        {
            this.currentSection = update.currentSection;
        }
    }
    
    userUpdate(update:any)
    {
        if(update)
        {
            
        }
    }
    
    ngAfterViewInit()
    {
        
    }
}