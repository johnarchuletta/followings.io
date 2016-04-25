import { Component, OnDestroy } from 'angular2/core';
import { FormBuilder, Control, ControlGroup, Validators } from "angular2/common";
import { Validate } from "../../classes/validate";
import { Subscription } from "rxjs/Subscription";

import { AppService } from "../../services/app/app.service";
import { UserService } from "../../services/user/user.service";

import { FadeInDirective } from "../../directives/fade-in/fade-in.directive";
import { Router, RouteParams } from "angular2/router";

@Component( {
    selector: '[login]',
    templateUrl: 'js/app/components/login/login.component.html',
    directives: [ FadeInDirective ]
} )

export class LoginComponent implements OnDestroy
{
    userServiceSubscription:Subscription;

    loginFailed:boolean = false;
    loginForm:ControlGroup;
    username:Control;
    password:Control;
    
    test:string = '';
    
    constructor( private _userService:UserService,
                 private _builder:FormBuilder,
                 private _router:Router )
    {
        // create form controls
        this.username = new Control( '', Validators.compose( [ Validators.required, Validate.username ] ) );
        this.password = new Control( '', Validators.compose( [ Validators.required, Validate.password ] ) );

        // create control group
        this.loginForm = this._builder.group( {
            username: this.username,
            password: this.password
        } );

        // subscribe to user service events
        this.userServiceSubscription = this._userService.observable$.subscribe( data =>
        {
            console.log( '[LoginComponent] UserService update received:' );
            console.log( data );
            this.userUpdate( data );
        } );

        // retrieve session session data
        let sessionUsername:string = sessionStorage.getItem( 'username' );
        let sessionPassword:string = sessionStorage.getItem( 'password' );

        // attempt login if session data exists
        if ( sessionUsername && sessionPassword )
        {
            this.login( sessionUsername, sessionPassword );
        }
    }

    ngOnDestroy()
    {
        // unsubscribe from user service
        this.userServiceSubscription.unsubscribe();
    }
    
    login( username?:string, password?:string )
    {
        // if failed login attempt state is active, refuse login
        if ( !this.loginFailed )
        {
            // if no data was passed into function, grab data from login form
            if ( !username && !password )
            {
                username = this.username.value.trim();
                password = this.password.value.trim();
            }

            // if login form is not empty, attempt login
            if ( username != '' && password != '' )
            {
                console.log( 'Logging in...' );
                this._userService.login( username, password );
            }
            else
            {
                console.log( 'Username and password not entered.' );
            }
        }
    }
    
    register()
    {
        // show register component
        this._router.navigate( [ 'Register' ] );
    }
    
    userUpdate( data:any )
    {
        if ( data.login )
        { // login was successful
            let username:string = this.username.value.trim();
            let password:string = this.password.value.trim();

            if ( username != '' && password != '' )
            {
                sessionStorage.setItem( 'username', username );
                sessionStorage.setItem( 'password', password );
            }

            this._router.navigate( [ 'Followings' ] );
        }
        else if ( data.login === false )
        { // login was unsuccessful
            this.loginFailed = true;
            setTimeout( () =>
            {
                this.loginFailed = false;
            }, 5000 )
        }
    }
}