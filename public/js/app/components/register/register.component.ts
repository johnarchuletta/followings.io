import { Component } from "angular2/core";
import { Control, ControlGroup, FormBuilder, ControlArray, Validators } from "angular2/common";

import { AppService } from "../../services/app/app.service";
import { UserService } from "../../services/user/user.service";
import { Validate } from "../../classes/validate";
import { Router } from "angular2/router";
import { FadeInDirective } from "../../directives/fade-in/fade-in.directive";

@Component( {
    selector: '[register]',
    templateUrl: 'js/app/components/register/register.component.html',
    directives: [ FadeInDirective ]
} )

export class RegisterComponent
{
    registerForm:ControlGroup;
    passwords:ControlArray;
    username:Control;
    password:Control;
    passwordCopy:Control;
    email:Control;
    soundcloudUrl:Control;
    
    registrationFailed:boolean = false;
    
    constructor( private _builder:FormBuilder,
                 private _userService:UserService,
                 private _router:Router )
    {
        this.username = new Control( '', Validators.compose( [ Validators.required, Validate.username ] ) );
        this.password = new Control( '', Validators.compose( [ Validators.required, Validate.password ] ) );
        this.passwordCopy = new Control( '', Validators.compose( [ Validators.required, Validate.password ] ) );
        this.email = new Control( '', Validators.compose( [ Validators.required, Validate.email ] ) );
        this.soundcloudUrl = new Control( '', Validators.compose( [ Validators.required, Validate.soundcloudUrl ] ) );

        this.registerForm = _builder.group( {
            username: this.username,
            password: this.password,
            passwordCopy: this.passwordCopy,
            passwords: this.passwords,
            email: this.email,
            soundcloudUrl: this.soundcloudUrl
        } );

        this.passwords = new ControlArray( [ this.password, this.passwordCopy ], Validate.matchPasswords );

        this._userService.observable$.subscribe( update =>
        {
            this.userUpdate( update );
        } )
    }
    
    cancel()
    {
        this._router.navigate( [ 'Login' ] );
    }
    
    register()
    {
        let username:string = this.username.value.trim();
        let password:string = this.password.value.trim();
        let email:string = this.email.value.trim();
        let soundcloudUrl:string = this.soundcloudUrl.value.trim();

        this._userService.register( username, password, email, soundcloudUrl );
    }

    userUpdate( data:any )
    {
        if ( data.login )
        {
            this._router.navigate( [ 'Followings' ] );
        }
        else
        {
            this.registrationFailed = true;
            setTimeout( () =>
            {
                this.registrationFailed = false;
            }, 5000 )
        }
    }
}