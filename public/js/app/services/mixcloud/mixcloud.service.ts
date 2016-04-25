import { Injectable } from "angular2/core";
import { Http } from "angular2/http";
import { Subject } from "rxjs/Subject";

@Injectable()

export class MixCloudService
{
    private _clientId:string = '5rgDb4Spk6TWc6xeZD';
    private _clientSecret:string = 'UR3Ku9CWu2RVcwRySrH7QQnWa4JuXE4U';

    private _update:Subject<{}> = new Subject<{}>();
    observable$ = this._update.asObservable();

    constructor( private _http:Http )
    {

    }

    search( followings:any )
    {
        let search = ( i:number ) =>
        {
            this._update.next( { searchIndex: i } );
            this._http.get( 'https://api.mixcloud.com/search/?type=user&q=' + encodeURI( followings[ i ].username ) )
                .map( response => response.json() )
                .subscribe( response =>
                    {
                        console.log( response );
                        if ( response.data.length > 0 )
                        {
                            followings[ i ][ 'mixcloud' ] = response.data[ 0 ];
                        }

                        if ( i < ( followings.length - 1 ) )
                        {
                            search( i + 1 );
                        }
                        else
                        {
                            console.log( 'Finished searching MixCloud.' );
                            this._update.next( { doneSearching: true } );
                        }
                    },
                    error =>
                    {
                        this._update.next( { error: error } )
                    } )
        };
        console.log( 'Searching MixCloud...' );
        search( 0 );
    }
}