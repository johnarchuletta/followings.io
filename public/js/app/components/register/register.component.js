System.register(["angular2/core", "angular2/common", "../../services/user/user.service", "../../classes/validate", "angular2/router", "../../directives/fade-in/fade-in.directive"], function(exports_1, context_1) {
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
    var core_1, common_1, user_service_1, validate_1, router_1, fade_in_directive_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (validate_1_1) {
                validate_1 = validate_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (fade_in_directive_1_1) {
                fade_in_directive_1 = fade_in_directive_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(_builder, _userService, _router) {
                    var _this = this;
                    this._builder = _builder;
                    this._userService = _userService;
                    this._router = _router;
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
                    this._userService.observable$.subscribe(function (update) {
                        _this.userUpdate(update);
                    });
                }
                RegisterComponent.prototype.cancel = function () {
                    this._router.navigate(['Login']);
                };
                RegisterComponent.prototype.register = function () {
                    var username = this.username.value.trim();
                    var password = this.password.value.trim();
                    var email = this.email.value.trim();
                    var soundcloudUrl = this.soundcloudUrl.value.trim();
                    this._userService.register(username, password, email, soundcloudUrl);
                };
                RegisterComponent.prototype.userUpdate = function (data) {
                    var _this = this;
                    if (data.login) {
                        this._router.navigate(['Followings']);
                    }
                    else {
                        this.registrationFailed = true;
                        setTimeout(function () {
                            _this.registrationFailed = false;
                        }, 5000);
                    }
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: '[register]',
                        templateUrl: 'js/app/components/register/register.component.html',
                        directives: [fade_in_directive_1.FadeInDirective]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, user_service_1.UserService, router_1.Router])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map