import { Injectable } from "angular2/core";
import { Subject } from "rxjs/Subject";
@Injectable()
export class AppService
{
    private _update:Subject<{}> = new Subject<{}>();
    observable$ = this._update.asObservable();
    
    private _loginStatus:boolean = false;
    private _currentSection:string = 'login';
    
    constructor()
    {
        // Do nothing
    }
    
    get loginStatus():boolean
    {
        return this._loginStatus;
    }
    
    set loginStatus( status:boolean )
    {
        this._loginStatus = status;
        this._update.next( { 'loginStatus': this._loginStatus } );
    }
    
    get currentSection():string
    {
        return this._currentSection;
    }
    
    set currentSection( section:string )
    {
        this._currentSection = section;
        this._update.next( { 'currentSection': this._currentSection } );
    }
}