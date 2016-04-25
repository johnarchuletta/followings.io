System.register(["angular2/core", "angular2/router", "../../services/app/app.service", "../../services/user/user.service", "../../services/soundcloud/soundcloud.service", "../../directives/fade-in/fade-in.directive", "../../directives/tooltip/tooltip-directive"], function(exports_1, context_1) {
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
    var core_1, router_1, app_service_1, user_service_1, soundcloud_service_1, fade_in_directive_1, tooltip_directive_1;
    var AccountComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (soundcloud_service_1_1) {
                soundcloud_service_1 = soundcloud_service_1_1;
            },
            function (fade_in_directive_1_1) {
                fade_in_directive_1 = fade_in_directive_1_1;
            },
            function (tooltip_directive_1_1) {
                tooltip_directive_1 = tooltip_directive_1_1;
            }],
        execute: function() {
            AccountComponent = (function () {
                function AccountComponent(_appService, _userService, _soundcloudService, _router) {
                    this._appService = _appService;
                    this._userService = _userService;
                    this._soundcloudService = _soundcloudService;
                    this._router = _router;
                    // template variables
                    this.showLoadingNotification = false;
                    this.followingsLoadError = false;
                    // Constructor
                }
                AccountComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // grab account information from user service
                    this.appUser = this._userService.user;
                    // subscribe to SoundCloudService event updates
                    this.soundcloudServiceSubscription = this._soundcloudService.observable$.subscribe(function (data) {
                        console.log('[AccountComponent] SoundCloudService update received:');
                        console.log(data);
                        _this.soundcloudUpdate(data);
                    });
                    this.userServiceSubscription = this._userService.observable$.subscribe(function (data) {
                        _this.userUpdate(data);
                    });
                    // has the soundcloud user and followings been retrieved yet?
                    if (this._soundcloudService.followings && this._soundcloudService.user) {
                        this.soundcloudUser = this._soundcloudService.user;
                        this.soundcloudFollowings = this._soundcloudService.followings;
                    }
                    else {
                        // check if user has a stored version of their followings in our database
                        this._userService.getSavedFollowings();
                    }
                };
                AccountComponent.prototype.ngOnDestroy = function () {
                    // unsubscribe from service updates
                    this.soundcloudServiceSubscription.unsubscribe();
                    this.userServiceSubscription.unsubscribe();
                };
                AccountComponent.prototype.userUpdate = function (data) {
                    if (data.getSavedFollowings) {
                        // user has followings stored
                        this.soundcloudFollowings = data.getSavedFollowings;
                        this._soundcloudService.followings = data.getSavedFollowings;
                        this._userService.getSoundCloudUser();
                    }
                    else if (data.getSavedFollowings === false) {
                        // user does not have followings stored, retrieve them from soundcloud
                        this.showLoadingNotification = true;
                        this._soundcloudService.getAllFollowings(this.appUser.soundcloudUrl);
                    }
                    else if (data.saveFollowings) {
                        console.log('User followings saved to database');
                    }
                    else if (data.saveFollowings === false) {
                        console.log('User followings not saved to database');
                    }
                    else if (data.getSoundCloudUser) {
                        this._soundcloudService.user = data.getSoundCloudUser;
                        this.soundcloudUser = data.getSoundCloudUser;
                    }
                    else if (data.getSoundCloudUser === false) {
                        this._soundcloudService.resolveUser(this.appUser.soundcloudUrl);
                    }
                    else if (data.saveSoundcloudUser) {
                        console.log('SoundCloud user data saved to database');
                    }
                    else if (data.saveSoundcloudUser === false) {
                        console.log('Could not save SoundCloud user data to database');
                    }
                };
                AccountComponent.prototype.soundcloudUpdate = function (data) {
                    if (data.resolveUser) {
                        this.soundcloudUser = this._soundcloudService.user;
                        this._userService.saveSoundCloudUser(this._soundcloudService.user);
                    }
                    else if (data.followings) {
                        this.showLoadingNotification = false;
                        this.soundcloudFollowings = this._soundcloudService.followings;
                        this._userService.saveFollowings(this._soundcloudService.followings);
                    } // error retrieving followings
                    else if (data.followings === false) {
                        this.showLoadingNotification = false;
                        this.followingsLoadError = true;
                    }
                };
                AccountComponent.prototype.getSoundCloudFollowings = function () {
                    // clear followings variable
                    this.soundcloudFollowings = null;
                    // show loading notification in view
                    this.showLoadingNotification = true;
                    // tell service to retrieve followings
                    this._soundcloudService.getAllFollowings(this.appUser.soundcloudUrl);
                };
                AccountComponent.prototype.logOut = function () {
                    // clear session data
                    sessionStorage.setItem('username', '');
                    sessionStorage.setItem('password', '');
                    // clear component data
                    this.appUser = null;
                    this.soundcloudUser = null;
                    this.soundcloudFollowings = null;
                    // clear data in services
                    this._userService.clearData();
                    this._soundcloudService.clearData();
                    // set app login status to false
                    this._appService.loginStatus = false;
                    // navigate user to login screen
                    this._router.navigate(['Login']);
                };
                AccountComponent = __decorate([
                    core_1.Component({
                        selector: '[account]',
                        templateUrl: 'js/app/components/account/account.component.html',
                        directives: [fade_in_directive_1.FadeInDirective, tooltip_directive_1.TooltipDirective]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, user_service_1.UserService, soundcloud_service_1.SoundCloudService, router_1.Router])
                ], AccountComponent);
                return AccountComponent;
            }());
            exports_1("AccountComponent", AccountComponent);
        }
    }
});
//# sourceMappingURL=account.component.js.map