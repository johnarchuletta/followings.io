System.register(["angular2/core", "angular2/http", "rxjs/Subject"], function(exports_1, context_1) {
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
    var core_1, http_1, Subject_1;
    var MixCloudService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            MixCloudService = (function () {
                function MixCloudService(_http) {
                    this._http = _http;
                    this._clientId = '5rgDb4Spk6TWc6xeZD';
                    this._clientSecret = 'UR3Ku9CWu2RVcwRySrH7QQnWa4JuXE4U';
                    this._update = new Subject_1.Subject();
                    this.observable$ = this._update.asObservable();
                }
                MixCloudService.prototype.search = function (followings) {
                    var _this = this;
                    var search = function (i) {
                        _this._update.next({ searchIndex: i });
                        _this._http.get('https://api.mixcloud.com/search/?type=user&q=' + encodeURI(followings[i].username))
                            .map(function (response) { return response.json(); })
                            .subscribe(function (response) {
                            console.log(response);
                            if (response.data.length > 0) {
                                followings[i]['mixcloud'] = response.data[0];
                            }
                            if (i < (followings.length - 1)) {
                                search(i + 1);
                            }
                            else {
                                console.log('Finished searching MixCloud.');
                                _this._update.next({ doneSearching: true });
                            }
                        }, function (error) {
                            _this._update.next({ error: error });
                        });
                    };
                    console.log('Searching MixCloud...');
                    search(0);
                };
                MixCloudService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MixCloudService);
                return MixCloudService;
            }());
            exports_1("MixCloudService", MixCloudService);
        }
    }
});
//# sourceMappingURL=mixcloud.service.js.map