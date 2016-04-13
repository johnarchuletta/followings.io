System.register(["angular2/core", "angular2/common", "../../services/app/app.service", "../../services/user/user.service", "../../classes/validate"], function(exports_1, context_1) {
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
    var RegisterComponent;
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
            RegisterComponent = (function () {
                function RegisterComponent(_appService, _builder, _userService) {
                    this._appService = _appService;
                    this._builder = _builder;
                    this._userService = _userService;
                    this.registrationFailed = false;
                    this.username = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, validate_1.Validate.username]));
                    this.password = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, validate_1.Validate.password]));
                    this.passwordCopy = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, validate_1.Validate.password]));
                    this.email = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, validate_1.Validate.email]));
                    this.soundcloudUrl = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, validate_1.Validate.soundcloudUrl]));
                    this.registerForm = _builder.group({
                        username: this.username,
                        password: this.password,
                        passwordCopy: this.passwordCopy,
                        passwords: this.passwords,
                        email: this.email,
                        soundcloudUrl: this.soundcloudUrl
                    });
                    this.passwords = new common_1.ControlArray([this.password, this.passwordCopy], validate_1.Validate.matchPasswords);
                }
                RegisterComponent.prototype.cancel = function () {
                    this._appService.currentSection = 'login';
                };
                RegisterComponent.prototype.register = function () {
                    var _this = this;
                    var username = this.username.value.trim();
                    var password = this.password.value.trim();
                    var email = this.email.value.trim();
                    var soundcloudUrl = this.soundcloudUrl.value.trim();
                    this._userService.register(username, password, email, soundcloudUrl)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        if (data.success) {
                            _this._appService.currentSection = 'login';
                        }
                        else {
                            _this.registrationFailed = true;
                            setTimeout(function () {
                                _this.registrationFailed = false;
                            }, 5000);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: '[register]',
                        templateUrl: 'js/app/components/register/register.component.html'
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, common_1.FormBuilder, user_service_1.UserService])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map