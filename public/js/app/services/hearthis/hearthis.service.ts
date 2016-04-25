import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Subject } from "rxjs/Subject";

@Injectable()
export class HearThisService
{
    private _update:Subject<{}> = new Subject<{}>();
    observable$ = this._update.asObservable();

    constructor( private http:Http )
    {
        // constructor
    }
    
    search( followings:any )
    {
        let search = ( index:number ) =>
        {
            let url:string = 'https://api-v2.hearthis.at/search?type=user&t=' + encodeURI( followings[ index ].permalink );

            this.http.get( url )
                .map( ( data:any ) => data.json() )
                .subscribe( ( data:any ) =>
                {
                    let handleData = ( data:any ) =>
                    {
                        if ( data != null )
                        {
                            if ( data.length > 0 )
                            {
                                followings[ index ][ 'hearthis' ] = data[ 0 ];
                            }
                            else
                            {
                                if ( data.success === false )
                                {
                                    index = followings.length;
                                    this._update.next( { rateLimit: true } );
                                }
                            }
                        }
                        else
                        {
                            this._update.next( { error: true } );
                        }
                    };

                    handleData( data );

                    index++;
                    this._update.next( { searchIndex: index } );

                    if ( index < followings.length )
                    {
                        search( index );
                    }
                    else
                    {
                        this._update.next( { doneSearching: true } );
                    }
                }, ( error ) =>
                {
                    this._update.next( { error: error } );

                    index++;
                    this._update.next( { searchIndex: index } );

                    if ( index < followings.length )
                    {
                        search( index );
                    }
                    else
                    {
                        this._update.next( { doneSearching: true } );
                    }
                } )
        };
        search( 0 );
    }
}