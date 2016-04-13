import { Component } from 'angular2/core';

import { AppService } from "../../services/app/app.service";
import { UserService } from "../../services/user/user.service";

@Component( {
    selector: '[navigation]',
    templateUrl: 'js/app/components/navigation/navigation.component.html',
    styleUrls: [ 'js/app/components/navigation/navigation.component.css' ]
} )

export class NavigationComponent
{
    constructor( private _appService:AppService,
                 private _userService:UserService )
    {
        // Do nothing
    }
}