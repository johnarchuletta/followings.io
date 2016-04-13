import { Injectable } from "angular2/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AppService
{
    private _appUpdate:Subject<{}> = new Subject<{}>();
    observable$ = this._appUpdate.asObservable();
    
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
        this._appUpdate.next( { 'loginStatus': this._loginStatus } );
    }
    
    get currentSection():string
    {
        return this._currentSection;
    }
    
    set currentSection( section:string )
    {
        this._currentSection = section;
        this._appUpdate.next( { 'currentSection': this._currentSection } );
    }
}