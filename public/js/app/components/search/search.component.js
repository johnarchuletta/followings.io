System.register(["angular2/core", "../../services/user/user.service", "../../services/soundcloud/soundcloud.service", "../../services/hearthis/hearthis.service", "../../services/mixcloud/mixcloud.service", "../../directives/fade-in/fade-in.directive"], function(exports_1, context_1) {
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
    var core_1, user_service_1, soundcloud_service_1, hearthis_service_1, mixcloud_service_1, fade_in_directive_1;
    var SearchComponent;
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
            },
            function (hearthis_service_1_1) {
                hearthis_service_1 = hearthis_service_1_1;
            },
            function (mixcloud_service_1_1) {
                mixcloud_service_1 = mixcloud_service_1_1;
            },
            function (fade_in_directive_1_1) {
                fade_in_directive_1 = fade_in_directive_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(_userService, _soundcloudService, _mixcloudService, _hearthisService) {
                    this._userService = _userService;
                    this._soundcloudService = _soundcloudService;
                    this._mixcloudService = _mixcloudService;
                    this._hearthisService = _hearthisService;
                    this.searching = false;
                    this.searched = false;
                    this.mixcloudIndex = 0;
                    this.hearthisIndex = 0;
                    // constructor
                }
                SearchComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.soundcloudFollowings = this._soundcloudService.followings;
                    this.mixcloudServiceSubscription = this._mixcloudService.observable$.subscribe(function (data) {
                        _this.mixcloudUpdate(data);
                    });
                    this.hearthisServiceSubscription = this._hearthisService.observable$.subscribe(function (data) {
                        _this.hearthisUpdate(data);
                    });
                };
                SearchComponent.prototype.ngOnDestroy = function () {
                    this.mixcloudServiceSubscription.unsubscribe();
                    this.hearthisServiceSubscription.unsubscribe();
                };
                SearchComponent.prototype.mixcloudUpdate = function (data) {
                    if (data.searchIndex) {
                        this.mixcloudIndex = data.searchIndex + 1;
                    }
                    else if (data.doneSearching) {
                        this.searching = false;
                        this.searched = true;
                    }
                };
                SearchComponent.prototype.hearthisUpdate = function (data) {
                    if (data.doneSearching) {
                        this.searching = false;
                        this.searched = true;
                    }
                    else if (data.rateLimit) {
                        console.log('HearThis rate limit reached at index ' + this.hearthisIndex);
                    }
                    else if (data.error) {
                        console.log(data.error);
                    }
                    else if (data.searchIndex) {
                        this.hearthisIndex = this.hearthisIndex + 1;
                    }
                };
                SearchComponent.prototype.searchMixCloud = function () {
                    console.log('Now searching MixCloud...');
                    this.searching = true;
                    this._mixcloudService.search(this.soundcloudFollowings);
                };
                SearchComponent.prototype.searchHearThis = function () {
                    this.searching = true;
                    this._hearthisService.search(this.soundcloudFollowings);
                };
                SearchComponent.prototype.saveFollowings = function () {
                    this.searched = false;
                    this._userService.saveFollowings(this.soundcloudFollowings);
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        selector: '[search]',
                        templateUrl: 'js/app/components/search/search.component.html',
                        directives: [fade_in_directive_1.FadeInDirective]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, soundcloud_service_1.SoundCloudService, mixcloud_service_1.MixCloudService, hearthis_service_1.HearThisService])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
//# sourceMappingURL=search.component.js.map