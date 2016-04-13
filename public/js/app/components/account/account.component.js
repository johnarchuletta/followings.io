System.register(["angular2/core", "../../services/user/user.service", "../../services/soundcloud/soundcloud.service"], function(exports_1, context_1) {
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
    var core_1, user_service_1, soundcloud_service_1;
    var AccountComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (soundcloud_service_1_1) {
                soundcloud_service_1 = soundcloud_service_1_1;
            }],
        execute: function() {
            AccountComponent = (function () {
                function AccountComponent(_userService, _soundcloudService) {
                    var _this = this;
                    this._userService = _userService;
                    this._soundcloudService = _soundcloudService;
                    this.lines = ['one', 'two', 'three', 'four'];
                    this.wait = false;
                    this.followingsLoadError = false;
                    this.appUser = this._userService.user;
                    this._soundcloudService.observable$.subscribe(function (data) {
                        _this.updateSoundcloud(data);
                    });
                    this._soundcloudService.resolveUser(this.appUser.soundcloudUrl);
                }
                AccountComponent.prototype.getSoundCloudFollowings = function () {
                    this.wait = true;
                    this._soundcloudService.getAllFollowings(this.soundcloudUser.id);
                };
                AccountComponent.prototype.updateSoundcloud = function (data) {
                    if (data.user) {
                        this.soundcloudUser = this._soundcloudService.user;
                    }
                    else if (data.followings) {
                        this.wait = false;
                        this.soundcloudFollowings = this._soundcloudService.followings;
                    }
                    else if (!data.followings) {
                        this.wait = false;
                        this.followingsLoadError = true;
                    }
                };
                AccountComponent = __decorate([
                    core_1.Component({
                        selector: '[account]',
                        templateUrl: 'js/app/components/account/account.component.html',
                        styleUrls: ['js/app/components/account/account.component.css'],
                        providers: [soundcloud_service_1.SoundCloudService],
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, soundcloud_service_1.SoundCloudService])
                ], AccountComponent);
                return AccountComponent;
            }());
            exports_1("AccountComponent", AccountComponent);
        }
    }
});
//# sourceMappingURL=account.component.js.map