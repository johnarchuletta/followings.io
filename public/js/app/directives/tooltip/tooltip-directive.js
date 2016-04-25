System.register(["angular2/core", "angular2/src/platform/browser/browser_adapter"], function(exports_1, context_1) {
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
    var core_1, browser_adapter_1;
    var TooltipDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
            }],
        execute: function() {
            TooltipDirective = (function () {
                function TooltipDirective(_element, _renderer, _dom) {
                    this._element = _element;
                    this._renderer = _renderer;
                    this._dom = _dom;
                    // Constructor
                }
                TooltipDirective.prototype.ngOnInit = function () {
                };
                TooltipDirective.prototype.ngAfterViewInit = function () {
                };
                TooltipDirective.prototype.ngAfterViewChecked = function () {
                };
                TooltipDirective.prototype.onMouseEnter = function (event) {
                    this._div = this._dom.createElement('div');
                    this._dom.appendChild(this._element.nativeElement, this._div);
                    this._dom.setInnerHTML(this._div, this.data.tip);
                    this._dom.setStyle(this._div, 'display', 'block');
                    this._dom.setStyle(this._div, 'font-size', '20px');
                    this._dom.setStyle(this._div, 'font-weight', 'bold');
                    this._dom.setStyle(this._div, 'position', 'absolute');
                    this._dom.setStyle(this._div, 'background', '#262626');
                    this._dom.setStyle(this._div, 'color', '#ccc');
                    this._dom.setStyle(this._div, 'padding', '3px 12px');
                    this._dom.setStyle(this._div, 'border', '1px solid #444');
                    this._dom.setStyle(this._div, 'border-radius', '3px');
                    this._dom.setStyle(this._div, 'box-shadow', '3px 3px 10px rgba(0, 0, 0, 0.5)');
                    this._dom.setStyle(this._div, 'z-index', '1000');
                    this._dom.setStyle(this._div, 'white-space', 'nowrap');
                };
                TooltipDirective.prototype.onMouseLeave = function (event) {
                    this._dom.setStyle(this._div, 'display', 'none');
                };
                TooltipDirective.prototype.onMouseMove = function (event) {
                    var parentRect = this._dom.getBoundingClientRect(this._element.nativeElement);
                    var tooltipRect = this._dom.getBoundingClientRect(this._div);
                    var x;
                    var y;
                    if (this.data.location === 'bottom') {
                        if (this.data.offset) {
                            x = event.clientX - parentRect.left - (tooltipRect.width / 2);
                            y = event.clientY - parentRect.top + 30;
                        }
                        else {
                            x = event.clientX - (tooltipRect.width / 2);
                            y = event.clientY + 30;
                        }
                    }
                    else if (this.data.location === 'right') {
                        if (this.data.offset) {
                            x = event.clientX - parentRect.left + 30;
                            y = event.clientY - parentRect.top - (tooltipRect.height / 2);
                        }
                        else {
                            x = event.clientX + 30;
                            y = event.clientY - (tooltipRect.height / 2);
                        }
                    }
                    this._dom.setStyle(this._div, 'top', y + 'px');
                    this._dom.setStyle(this._div, 'left', x + 'px');
                };
                __decorate([
                    core_1.Input('tooltip'), 
                    __metadata('design:type', Object)
                ], TooltipDirective.prototype, "data", void 0);
                TooltipDirective = __decorate([
                    core_1.Directive({
                        selector: '[tooltip]',
                        host: {
                            '(mouseenter)': 'onMouseEnter($event)',
                            '(mouseleave)': 'onMouseLeave($event)',
                            '(mousemove)': 'onMouseMove($event)'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, browser_adapter_1.BrowserDomAdapter])
                ], TooltipDirective);
                return TooltipDirective;
            }());
            exports_1("TooltipDirective", TooltipDirective);
        }
    }
});
//# sourceMappingURL=tooltip-directive.js.map