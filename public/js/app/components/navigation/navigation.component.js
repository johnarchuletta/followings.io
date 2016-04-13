System.register(['angular2/core', "../../services/app/app.service", "../../services/user/user.service"], function(exports_1, context_1) {
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
    var core_1, app_service_1, user_service_1;
    var NavigationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            NavigationComponent = (function () {
                function NavigationComponent(_appService, _userService) {
                    this._appService = _appService;
                    this._userService = _userService;
                    // Do nothing
                }
                NavigationComponent = __decorate([
                    core_1.Component({
                        selector: '[navigation]',
                        templateUrl: 'js/app/components/navigation/navigation.component.html',
                        styleUrls: ['js/app/components/navigation/navigation.component.css']
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, user_service_1.UserService])
                ], NavigationComponent);
                return NavigationComponent;
            }());
            exports_1("NavigationComponent", NavigationComponent);
        }
    }
});
//# sourceMappingURL=navigation.component.js.map