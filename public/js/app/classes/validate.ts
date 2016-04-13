import { Injectable } from "angular2/core";
import { Control, ControlArray } from "angular2/common";

@Injectable()
export class Validate
{
    static username( control:Control ):ValidationResult
    {
        let value:string = control.value.trim();
        let exp:any = /^[a-zA-Z0-9_-]{3,16}$/;
        let result:boolean = exp.test( value );
        
        if ( result && !control.pristine )
        {
            return null;
        }
        else
        {
            return { 'invalidUsername': true };
        }
    }
    
    static password( control:Control ):ValidationResult
    {
        let value:string = control.value.trim();
        let exp:any = /^[a-zA-Z0-9_-]{6,18}$/;
        let result:boolean = exp.test( value );
        
        if ( result && !control.pristine )
        {
            return null;
        }
        else
        {
            return { 'invalidPassword': true };
        }
    }
    
    static matchPasswords( controlArray:ControlArray ):ValidationResult
    {
        if ( controlArray.controls[ 0 ].value === controlArray.controls[ 1 ].value )
        {
            return null;
        }
        else
        {
            return { 'passwordMismatch': true };
        }
    }
    
    static email( control:Control ):ValidationResult
    {
        let value:string = control.value.trim();
        let exp:any = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        let result:boolean = exp.test( value );
        
        if ( result && !control.pristine )
        {
            return null;
        }
        else
        {
            return { 'invalidEmail': true };
        }
    }
    
    static soundcloudUrl( control:Control ):ValidationResult
    {
        let value:string = control.value.trim();
        let exp:any = /^[a-zA-Z0-9_-]{3,24}$/;
        let result:boolean = exp.test( value );
        
        if ( result && !control.pristine )
        {
            return null;
        }
        else
        {
            return { 'invalidSoundcloudUrl': true };
        }
    }
}

interface ValidationResult
{
    [key:string]:any;
}