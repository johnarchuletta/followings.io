System.register(['angular2/core', "angular2/src/platform/browser/browser_adapter", "../../services/app/app.service", "../../services/user/user.service", "../../directives/tooltip/tooltip-directive", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, browser_adapter_1, app_service_1, user_service_1, tooltip_directive_1, router_1;
    var NavigationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (tooltip_directive_1_1) {
                tooltip_directive_1 = tooltip_directive_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            NavigationComponent = (function () {
                function NavigationComponent(_appService, _userService, _router) {
                    this._appService = _appService;
                    this._userService = _userService;
                    this._router = _router;
                    this.hideLoginError = true;
                    this.dom = new browser_adapter_1.BrowserDomAdapter;
                    this.user = this._userService.user;
                }
                NavigationComponent.prototype.navigate = function (event, section) {
                    var _this = this;
                    event.preventDefault();
                    if (this._appService.loginStatus) {
                        this._router.navigate([section]);
                    }
                    else {
                        if (this.hideLoginError) {
                            this.hideLoginError = false;
                            var x = event.clientX + 20;
                            var y = event.clientY + 20;
                            var e = this.dom.query('div.login-error');
                            this.dom.setStyle(e, 'left', x + 'px');
                            this.dom.setStyle(e, 'top', y + 'px');
                            this.dom.setStyle(e, 'opacity', '1');
                            setTimeout(function () {
                                var e = _this.dom.query('div.login-error');
                                _this.dom.setStyle(e, 'opacity', '0');
                                setTimeout(function () {
                                    _this.hideLoginError = true;
                                }, 500);
                            }, 3000);
                        }
                    }
                };
                NavigationComponent = __decorate([
                    core_1.Component({
                        selector: '[navigation]',
                        templateUrl: 'js/app/components/navigation/navigation.component.html',
                        directives: [tooltip_directive_1.TooltipDirective]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, user_service_1.UserService, router_1.Router])
                ], NavigationComponent);
                return NavigationComponent;
            }());
            exports_1("NavigationComponent", NavigationComponent);
        }
    }
});
//# sourceMappingURL=navigation.component.js.map