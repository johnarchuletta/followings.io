System.register(['angular2/core', "angular2/common", "../../services/app/app.service", "../../services/user/user.service", "../../classes/validate"], function(exports_1, context_1) {
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
    var core_1, common_1, app_service_1, user_service_1, validate_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (validate_1_1) {
                validate_1 = validate_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_appService, _userService, _builder) {
                    var _this = this;
                    this._appService = _appService;
                    this._userService = _userService;
                    this._builder = _builder;
                    this.loginFailed = false;
                    this.username = new common_1.Control('arc', common_1.Validators.compose([common_1.Validators.required, validate_1.Validate.username]));
                    this.password = new common_1.Control('Fcarmex8089', common_1.Validators.compose([common_1.Validators.required, validate_1.Validate.password]));
                    this.loginForm = this._builder.group({
                        username: this.username,
                        password: this.password
                    });
                    this._userService.observable$.subscribe(function (data) {
                        _this.userUpdate(data);
                    });
                }
                LoginComponent.prototype.login = function () {
                    if (!this.loginFailed) {
                        var username = this.username.value.trim();
                        var password = this.password.value.trim();
                        if (username != '' && password != '') {
                            this._userService.login(username, password);
                        }
                        else {
                            console.log('Username and password not entered.');
                        }
                    }
                };
                LoginComponent.prototype.register = function () {
                    this._appService.currentSection = 'register';
                };
                LoginComponent.prototype.userUpdate = function (data) {
                    var _this = this;
                    if (data.login) {
                        this._appService.currentSection = 'account';
                    }
                    else {
                        this.loginFailed = true;
                        setTimeout(function () {
                            _this.loginFailed = false;
                        }, 5000);
                    }
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: '[login]',
                        templateUrl: 'js/app/components/login/login.component.html'
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, user_service_1.UserService, common_1.FormBuilder])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map