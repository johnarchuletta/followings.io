import { Directive, ElementRef, AfterViewInit } from 'angular2/core';
import { BrowserDomAdapter } from 'angular2/platform/browser';

@Directive( {
    selector: '[fade-in]',
    providers: [ BrowserDomAdapter ]
} )

export class FadeInDirective implements AfterViewInit
{
    constructor( private _elementRef:ElementRef, private _dom:BrowserDomAdapter )
    {
        this._dom.setStyle( this._elementRef.nativeElement, 'transition', 'opacity 0.25s' );
        this._dom.setStyle( this._elementRef.nativeElement, 'opacity', '0' );
    }
    
    ngAfterViewInit()
    {
        setTimeout( () =>
        {
            this._dom.setStyle( this._elementRef.nativeElement, 'opacity', '1' );
        }, 250 );
    }
}