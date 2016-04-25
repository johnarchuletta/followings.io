System.register(['angular2/core', "rxjs/Subject"], function(exports_1, context_1) {
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
    var core_1, Subject_1;
    var SoundCloudService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            SoundCloudService = (function () {
                function SoundCloudService() {
                    // create observable for clients to subscribe to
                    this._update = new Subject_1.Subject();
                    this.observable$ = this._update.asObservable();
                    // data for soundcloud api services
                    this._clientId = '8a834fccc443cc9d97237b5ee7ed36ca';
                    this._redirectUri = 'http://localhost:3000/callback.html';
                    console.log('initializing soundcloud');
                    SC.initialize({
                        client_id: this._clientId,
                        redirect_uri: this._redirectUri
                    });
                }
                Object.defineProperty(SoundCloudService.prototype, "user", {
                    get: function () {
                        return this._user;
                    },
                    set: function (user) {
                        this._user = user;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SoundCloudService.prototype, "followings", {
                    get: function () {
                        return this._followings;
                    },
                    set: function (followings) {
                        this._followings = followings;
                    },
                    enumerable: true,
                    configurable: true
                });
                SoundCloudService.prototype.clearData = function () {
                    this._user = null;
                    this._followings = null;
                    this._update.next({ 'clear': true });
                };
                SoundCloudService.prototype.resolveUser = function (username) {
                    var _this = this;
                    SC.get('/resolve?url=http://soundcloud.com/' + username + '&client_id=' + this._clientId)
                        .then(function (response) {
                        _this._user = response;
                        _this._update.next({ resolveUser: true });
                    });
                };
                SoundCloudService.prototype.getAllFollowings = function (username) {
                    var _this = this;
                    var collect = function (userId) {
                        SC.get('/users/' + userId + '/followings')
                            .then(function (response) {
                            console.log('do we get here?????');
                            var followings = [];
                            var parseResponse = function (response) {
                                if (response.collection.length > 0) {
                                    for (var i = 0; i < response.collection.length; i++) {
                                        followings.push(response.collection[i]);
                                    }
                                }
                                if (response.next_href) {
                                    SC.get(response.next_href.slice(27, response.next_href.length))
                                        .then(function (response) {
                                        parseResponse(response);
                                    }, function (error) {
                                        _this._update.next({ followings: false, error: error });
                                    });
                                }
                                else {
                                    _this._followings = followings;
                                    _this._update.next({ followings: true });
                                }
                            };
                            parseResponse(response);
                        }, function (error) {
                            console.log(error);
                        });
                    };
                    console.log('resolving sc user: /resolve?url=http://soundcloud.com/' + username);
                    SC.get('/resolve?url=http://soundcloud.com/' + username)
                        .then(function (response) {
                        console.log(response);
                        _this._user = response;
                        _this._update.next({ resolveUser: true });
                        collect(response.id);
                    }, function (error) {
                        console.log(error);
                    });
                };
                SoundCloudService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SoundCloudService);
                return SoundCloudService;
            }());
            exports_1("SoundCloudService", SoundCloudService);
        }
    }
});
//# sourceMappingURL=soundcloud.service.js.map