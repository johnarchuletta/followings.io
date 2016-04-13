import { Component } from "angular2/core";
import { Control, ControlGroup, FormBuilder, ControlArray, Validators } from "angular2/common";

import { AppService } from "../../services/app/app.service";
import { UserService } from "../../services/user/user.service";
import { Validate } from "../../classes/validate";

@Component( {
    selector: '[register]',
    templateUrl: 'js/app/components/register/register.component.html'
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
    
    constructor( private _appService:AppService,
                 private _builder:FormBuilder,
                 private _userService:UserService )
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
    }
    
    cancel()
    {
        this._appService.currentSection = 'login';
    }
    
    register()
    {
        let username:string = this.username.value.trim();
        let password:string = this.password.value.trim();
        let email:string = this.email.value.trim();
        let soundcloudUrl:string = this.soundcloudUrl.value.trim();

        this._userService.register( username, password, email, soundcloudUrl )
            .map( res => res.json() )
            .subscribe( data =>
            {
                if ( data.success )
                {
                    this._appService.currentSection = 'login';
                }
                else
                {
                    this.registrationFailed = true;
                    setTimeout( () =>
                    {
                        this.registrationFailed = false;
                    }, 5000 )
                }
            }, ( error ) =>
            {
                console.log( error );
            } )
    }
}