System.register(['angular2/core', 'angular2/platform/browser'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1;
    var FadeInDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            FadeInDirective = (function () {
                function FadeInDirective(_elementRef, _dom) {
                    this._elementRef = _elementRef;
                    this._dom = _dom;
                    this._dom.setStyle(this._elementRef.nativeElement, 'transition', 'opacity 0.25s');
                    this._dom.setStyle(this._elementRef.nativeElement, 'opacity', '0');
                }
                FadeInDirective.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this._dom.setStyle(_this._elementRef.nativeElement, 'opacity', '1');
                    }, 250);
                };
                FadeInDirective = __decorate([
                    core_1.Directive({
                        selector: '[fade-in]',
                        providers: [browser_1.BrowserDomAdapter]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, browser_1.BrowserDomAdapter])
                ], FadeInDirective);
                return FadeInDirective;
            }());
            exports_1("FadeInDirective", FadeInDirective);
        }
    }
});
//# sourceMappingURL=fade-in.directive.js.map