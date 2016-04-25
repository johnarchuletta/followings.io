System.register(['angular2/core', "rxjs/Subject", "angular2/http", "../app/app.service"], function(exports_1, context_1) {
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
    var core_1, Subject_1, http_1, app_service_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(_http, _appService) {
                    this._http = _http;
                    this._appService = _appService;
                    this._update = new Subject_1.Subject();
                    this.observable$ = this._update.asObservable();
                    // constructor
                }
                Object.defineProperty(UserService.prototype, "user", {
                    get: function () {
                        return this._user;
                    },
                    enumerable: true,
                    configurable: true
                });
                UserService.prototype.clearData = function () {
                    this._user = null;
                    this._update.next({ 'reset': true });
                };
                UserService.prototype.login = function (username, password) {
                    var _this = this;
                    var headers = new http_1.Headers;
                    var body = JSON.stringify({
                        username: username,
                        password: password
                    });
                    headers.append('Content-Type', 'application/json');
                    this._http.post('/login', body, { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (response) {
                        if (response.success) {
                            _this._user = response.user;
                            _this._appService.loginStatus = true;
                            _this._update.next({ login: true });
                        }
                        else {
                            _this._appService.loginStatus = false;
                            _this._update.next({ login: false, message: response.message });
                        }
                    });
                };
                UserService.prototype.register = function (username, password, email, soundcloudUrl) {
                    var _this = this;
                    this._http.request('/register', {
                        method: 'POST',
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            email: email,
                            soundcloudUrl: soundcloudUrl
                        })
                    })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log(data);
                        if (data.success) {
                            _this.login(username, password);
                            _this._update.next({ register: true });
                        }
                        else {
                            _this._update.next({ register: false });
                        }
                    }, function (error) {
                        console.log(error);
                    });
                };
                UserService.prototype.getSavedFollowings = function () {
                    var _this = this;
                    this._http.request('/followings', {
                        method: 'POST',
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            username: this._user.username,
                        })
                    })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log('BOOM--------');
                        if (data.followings != '') {
                            _this._update.next({ getSavedFollowings: data.followings });
                        }
                        else {
                            _this._update.next({ getSavedFollowings: false });
                        }
                    });
                };
                UserService.prototype.saveFollowings = function (followings) {
                    var _this = this;
                    this._http.request('/followings', {
                        method: 'POST',
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            username: this._user.username,
                            followings: followings
                        })
                    })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        if (data.saveFollowings) {
                            _this._update.next({ saveFollowings: true });
                        }
                        else {
                            _this._update.next({ saveFollowings: false });
                        }
                    });
                };
                UserService.prototype.getSoundCloudUser = function () {
                    var _this = this;
                    this._http.request('/soundcloud', {
                        method: 'POST',
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            username: this._user.username,
                        })
                    })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        if (data.soundcloudUser) {
                            _this._update.next({ getSoundCloudUser: JSON.parse(data.soundcloudUser) });
                        }
                        else {
                            _this._update.next({ getSoundCloudUser: false });
                        }
                    });
                };
                UserService.prototype.saveSoundCloudUser = function (soundcloudUser) {
                    var _this = this;
                    this._http.request('/soundcloud', {
                        method: 'POST',
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            username: this._user.username,
                            soundcloudUser: soundcloudUser
                        })
                    })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        if (data.saveSoundcloudUser) {
                            _this._update.next({ saveSoundcloudUser: true });
                        }
                        else {
                            _this._update.next({ saveSoundcloudUser: false });
                        }
                    });
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, app_service_1.AppService])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map