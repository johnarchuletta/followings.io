System.register(['angular2/core', 'angular2/platform/browser', 'angular2/http', '../../services/soundcloud/soundcloud.service', '../../services/hearthis/hearthis.service', '../../directives/fade-in/fade-in.directive', '../../components/login/login.component'], function(exports_1, context_1) {
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
    var core_1, browser_1, http_1, soundcloud_service_1, hearthis_service_1, fade_in_directive_1, login_component_1;
    var MainComponent, Section, FollowingsStatus;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (soundcloud_service_1_1) {
                soundcloud_service_1 = soundcloud_service_1_1;
            },
            function (hearthis_service_1_1) {
                hearthis_service_1 = hearthis_service_1_1;
            },
            function (fade_in_directive_1_1) {
                fade_in_directive_1 = fade_in_directive_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            MainComponent = (function () {
                function MainComponent(_http, _soundcloud, _ht) {
                    this._http = _http;
                    this._soundcloud = _soundcloud;
                    this._ht = _ht;
                    // Global objects
                    this.dom = new browser_1.BrowserDomAdapter;
                    this.FollowingsStatus = FollowingsStatus; // DO NOT DELETE
                    this.Section = Section; // DO NOT DELETE
                    // Template variables
                    this.step = 1;
                    this.htRateLimitReached = false;
                    // State variables
                    this.fs = FollowingsStatus.empty;
                    // SoundCloud data
                    this.username = 'arc1';
                    this.user = [];
                    this.followings = [];
                    //Session data
                    this.loggedIn = false;
                    //State data
                    this.section = Section.login;
                    //Login data
                    this.loginUsername = '';
                    this.loginPassword = '';
                    //Register data
                    this.registerUsername = '';
                    this.registerPassword = '';
                    this.registerPassword2 = '';
                    this.registerEmail = '';
                    this.registerScurl = '';
                }
                MainComponent.prototype.getSCFollowings = function () {
                    var _this = this;
                    if (this.username != null && this.username != '') {
                        this.fs = FollowingsStatus.retrieving; // Notify template of state
                        this._soundcloud.getAllFollowings(this.username)
                            .then(function (data) {
                            _this.user = data[0]; // The first object in array is always user info
                            _this.followings = data[1]; // Second object is followings array
                            _this.fs = FollowingsStatus.retrieved;
                        }, function (error) {
                            console.log(error);
                            _this.fs = FollowingsStatus.error;
                        });
                    }
                    else {
                        this.fs = FollowingsStatus.noUsername;
                    }
                };
                MainComponent.prototype.findHTUsers = function () {
                    var _this = this;
                    this.htUserSearch$ = this._ht.findHTUsers(this.followings);
                    this.htUserSearch$
                        .subscribe(function (data) {
                        if (data === 'RATE') {
                            _this.htRateLimitReached = true;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                };
                MainComponent.prototype.login = function () {
                    var self = this;
                    var body = 'username=' + this.loginUsername + '&password=' + this.loginPassword;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-registerForm-urlencoded');
                    this._http.post('/login', body, { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log(data);
                        if (data.success === true) {
                            self.section = Section.followings;
                        }
                        else {
                            console.log('User not found.');
                        }
                    }, function (error) {
                        console.log(error.success);
                    });
                };
                MainComponent.prototype.register = function () {
                    var body = 'username=' + this.registerUsername + '&password=' + this.registerPassword;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-registerForm-urlencoded');
                    this._http.post('/register', body, { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log(data.success);
                    }, function (error) {
                        console.log(error.success);
                    });
                };
                MainComponent.prototype.setSection = function (section, fromSection, event) {
                    if (event)
                        event.preventDefault();
                    if (section === 'login') {
                        this.section = Section.login;
                    }
                    else if (section === 'register') {
                        this.section = Section.register;
                    }
                };
                MainComponent = __decorate([
                    core_1.Component({
                        directives: [fade_in_directive_1.FadeInDirective, login_component_1.LoginComponent],
                        providers: [http_1.JSONP_PROVIDERS, soundcloud_service_1.SoundCloudService, hearthis_service_1.HearThisService],
                        templateUrl: 'js/app/components/main/main.component.html',
                        styleUrls: ['js/app/components/main/main.component.css']
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, soundcloud_service_1.SoundCloudService, hearthis_service_1.HearThisService])
                ], MainComponent);
                return MainComponent;
            }());
            exports_1("MainComponent", MainComponent);
            //------------------------------------------------------------------------------------------------------------------
            (function (Section) {
                Section[Section["register"] = 0] = "register";
                Section[Section["login"] = 1] = "login";
                Section[Section["followings"] = 2] = "followings";
                Section[Section["search"] = 3] = "search";
                Section[Section["settings"] = 4] = "settings";
                Section[Section["account"] = 5] = "account";
                Section[Section["splash"] = 6] = "splash";
            })(Section || (Section = {}));
            (function (FollowingsStatus) {
                FollowingsStatus[FollowingsStatus["empty"] = 0] = "empty";
                FollowingsStatus[FollowingsStatus["retrieving"] = 1] = "retrieving";
                FollowingsStatus[FollowingsStatus["retrieved"] = 2] = "retrieved";
                FollowingsStatus[FollowingsStatus["noUsername"] = 3] = "noUsername";
                FollowingsStatus[FollowingsStatus["error"] = 4] = "error";
            })(FollowingsStatus || (FollowingsStatus = {}));
        }
    }
});
//# sourceMappingURL=main.component.js.map