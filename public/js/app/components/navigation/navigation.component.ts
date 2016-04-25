import { Component } from 'angular2/core';
import { BrowserDomAdapter } from "angular2/src/platform/browser/browser_adapter";

import { AppService } from "../../services/app/app.service";
import { UserService } from "../../services/user/user.service";

import { TooltipDirective } from "../../directives/tooltip/tooltip-directive";
import { Router } from "angular2/router";

@Component( {
    selector: '[navigation]',
    templateUrl: 'js/app/components/navigation/navigation.component.html',
    directives: [ TooltipDirective ]
} )

export class NavigationComponent
{
    user:any;
    hideLoginError:boolean = true;
    dom:BrowserDomAdapter = new BrowserDomAdapter;

    constructor( private _appService:AppService,
                 private _userService:UserService,
                 private _router:Router )
    {
        this.user = this._userService.user;
    }

    navigate( event:any, section:string )
    {
        event.preventDefault();
        if ( this._appService.loginStatus )
        {
            this._router.navigate( [ section ] );
        }
        else
        {
            if ( this.hideLoginError )
            {
                this.hideLoginError = false;
                let x = event.clientX + 20;
                let y = event.clientY + 20;
                let e = this.dom.query( 'div.login-error' );
                this.dom.setStyle( e, 'left', x + 'px' );
                this.dom.setStyle( e, 'top', y + 'px' );
                this.dom.setStyle( e, 'opacity', '1' );
                setTimeout( () =>
                {
                    let e = this.dom.query( 'div.login-error' );
                    this.dom.setStyle( e, 'opacity', '0' );
                    setTimeout( () =>
                    {
                        this.hideLoginError = true;
                    }, 500 );
                }, 3000 )
            }
        }
    }
}