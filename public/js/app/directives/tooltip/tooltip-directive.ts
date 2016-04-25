import { Directive, ElementRef, OnInit, Input, AfterViewInit, AfterViewChecked, Renderer } from "angular2/core";
import { BrowserDomAdapter } from "angular2/src/platform/browser/browser_adapter";

@Directive( {
    selector: '[tooltip]',
    host: {
        '(mouseenter)': 'onMouseEnter($event)',
        '(mouseleave)': 'onMouseLeave($event)',
        '(mousemove)': 'onMouseMove($event)'
    }
} )

export class TooltipDirective implements OnInit, AfterViewInit, AfterViewChecked
{
    @Input( 'tooltip' ) data:any;

    private _div:HTMLElement;

    constructor( private _element:ElementRef,
                 private _renderer:Renderer,
                 private _dom:BrowserDomAdapter )
    {
        // Constructor
    }

    ngOnInit()
    {

    }

    ngAfterViewInit()
    {

    }

    ngAfterViewChecked()
    {

    }

    onMouseEnter( event )
    {
        this._div = this._dom.createElement( 'div' );
        this._dom.appendChild( this._element.nativeElement, this._div );
        this._dom.setInnerHTML( this._div, this.data.tip );
        this._dom.setStyle( this._div, 'display', 'block' );
        this._dom.setStyle( this._div, 'font-size', '20px' );
        this._dom.setStyle( this._div, 'font-weight', 'bold' );
        this._dom.setStyle( this._div, 'position', 'absolute' );
        this._dom.setStyle( this._div, 'background', '#262626' );
        this._dom.setStyle( this._div, 'color', '#ccc' );
        this._dom.setStyle( this._div, 'padding', '3px 12px' );
        this._dom.setStyle( this._div, 'border', '1px solid #444' );
        this._dom.setStyle( this._div, 'border-radius', '3px' );
        this._dom.setStyle( this._div, 'box-shadow', '3px 3px 10px rgba(0, 0, 0, 0.5)' );
        this._dom.setStyle( this._div, 'z-index', '1000' );
        this._dom.setStyle( this._div, 'white-space', 'nowrap' );
    }

    onMouseLeave( event )
    {
        this._dom.setStyle( this._div, 'display', 'none' );
    }

    onMouseMove( event )
    {
        let parentRect = this._dom.getBoundingClientRect( this._element.nativeElement );
        let tooltipRect = this._dom.getBoundingClientRect( this._div );
        let x:number;
        let y:number;

        if ( this.data.location === 'bottom' )
        {
            if ( this.data.offset )
            {
                x = event.clientX - parentRect.left - (tooltipRect.width / 2);
                y = event.clientY - parentRect.top + 30;
            }
            else
            {
                x = event.clientX - (tooltipRect.width / 2);
                y = event.clientY + 30;
            }
        }
        else if ( this.data.location === 'right' )
        {
            if ( this.data.offset )
            {
                x = event.clientX - parentRect.left + 30;
                y = event.clientY - parentRect.top - ( tooltipRect.height / 2 );
            }
            else
            {
                x = event.clientX + 30;
                y = event.clientY - ( tooltipRect.height / 2 );
            }
        }

        this._dom.setStyle( this._div, 'top', y + 'px' );
        this._dom.setStyle( this._div, 'left', x + 'px' );
    }
}