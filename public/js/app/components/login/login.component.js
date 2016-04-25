System.register(['angular2/core', "angular2/common", "../../classes/validate", "../../services/user/user.service", "../../directives/fade-in/fade-in.directive", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, common_1, validate_1, user_service_1, fade_in_directive_1, router_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (validate_1_1) {
                validate_1 = validate_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (fade_in_directive_1_1) {
                fade_in_directive_1 = fade_in_directive_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_userService, _builder, _router, _routeParams) {
                    var _this = this;
                    this._userService = _userService;
                    this._builder = _builder;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.loginFailed = false;
                    this.test = '';
                    // create form controls
                    this.username = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, validate_1.Validate.username]));
                    this.password = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, validate_1.Validate.password]));
                    // create control group
                    this.loginForm = this._builder.group({
                        username: this.username,
                        password: this.password
                    });
                    // subscribe to user service events
                    this.userServiceSubscription = this._userService.observable$.subscribe(function (data) {
                        console.log('[LoginComponent] UserService update received:');
                        console.log(data);
                        _this.userUpdate(data);
                    });
                    // retrieve session session data
                    var sessionUsername = sessionStorage.getItem('username');
                    var sessionPassword = sessionStorage.getItem('password');
                    // attempt login if session data exists
                    if (sessionUsername && sessionPassword) {
                        this.login(sessionUsername, sessionPassword);
                    }
                }
                LoginComponent.prototype.ngOnDestroy = function () {
                    // unsubscribe from user service
                    this.userServiceSubscription.unsubscribe();
                };
                LoginComponent.prototype.login = function (username, password) {
                    // if failed login attempt state is active, refuse login
                    if (!this.loginFailed) {
                        // if no data was passed into function, grab data from login form
                        if (!username && !password) {
                            username = this.username.value.trim();
                            password = this.password.value.trim();
                        }
                        // if login form is not empty, attempt login
                        if (username != '' && password != '') {
                            console.log('Logging in...');
                            this._userService.login(username, password);
                        }
                        else {
                            console.log('Username and password not entered.');
                        }
                    }
                };
                LoginComponent.prototype.register = function () {
                    // show register component
                    this._router.navigate(['Register']);
                };
                LoginComponent.prototype.userUpdate = function (data) {
                    var _this = this;
                    if (data.login) {
                        var username = this.username.value.trim();
                        var password = this.password.value.trim();
                        if (username != '' && password != '') {
                            sessionStorage.setItem('username', username);
                            sessionStorage.setItem('password', password);
                        }
                        this._router.navigate(['Followings']);
                    }
                    else if (data.login === false) {
                        this.loginFailed = true;
                        setTimeout(function () {
                            _this.loginFailed = false;
                        }, 5000);
                    }
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: '[login]',
                        templateUrl: 'js/app/components/login/login.component.html',
                        directives: [fade_in_directive_1.FadeInDirective]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, common_1.FormBuilder, router_1.Router, router_1.RouteParams])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map