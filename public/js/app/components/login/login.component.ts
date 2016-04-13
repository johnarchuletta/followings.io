import { Component } from 'angular2/core';
import { FormBuilder, Control, ControlGroup, Validators } from "angular2/common";

import { AppService } from "../../services/app/app.service";
import { UserService } from "../../services/user/user.service";

import { Validate } from "../../classes/validate";

@Component( {
    selector: '[login]',
    templateUrl: 'js/app/components/login/login.component.html'
} )

export class LoginComponent
{
    loginFailed:boolean = false;
    loginForm:ControlGroup;
    username:Control;
    password:Control;
    
    constructor( private _appService:AppService,
                 private _userService:UserService,
                 private _builder:FormBuilder )
    {
        this.username = new Control( 'arc', Validators.compose( [ Validators.required, Validate.username ] ) );
        this.password = new Control( 'Fcarmex8089', Validators.compose( [ Validators.required, Validate.password ] ) );
        
        this.loginForm = this._builder.group( {
            username: this.username,
            password: this.password
        } );
        
        this._userService.observable$.subscribe( data =>
        {
            this.userUpdate( data );
        } );
    }
    
    login()
    {
        if ( !this.loginFailed )
        {
            let username:string = this.username.value.trim();
            let password:string = this.password.value.trim();
            
            if ( username != '' && password != '' )
            {
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
        this._appService.currentSection = 'register';
    }
    
    userUpdate( data:any )
    {
        if ( data.login )
        {
            this._appService.currentSection = 'account';
        }
        else
        {
            this.loginFailed = true;
            setTimeout( () =>
            {
                this.loginFailed = false;
            }, 5000 )
        }
    }
}