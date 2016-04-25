System.register(['angular2/core', 'angular2/http', "rxjs/Subject"], function(exports_1, context_1) {
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
    var HearThisService;
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
            HearThisService = (function () {
                function HearThisService(http) {
                    this.http = http;
                    this._update = new Subject_1.Subject();
                    this.observable$ = this._update.asObservable();
                    // constructor
                }
                HearThisService.prototype.search = function (followings) {
                    var _this = this;
                    var search = function (index) {
                        var url = 'https://api-v2.hearthis.at/search?type=user&t=' + encodeURI(followings[index].permalink);
                        _this.http.get(url)
                            .map(function (data) { return data.json(); })
                            .subscribe(function (data) {
                            var handleData = function (data) {
                                if (data != null) {
                                    if (data.length > 0) {
                                        followings[index]['hearthis'] = data[0];
                                    }
                                    else {
                                        if (data.success === false) {
                                            index = followings.length;
                                            _this._update.next({ rateLimit: true });
                                        }
                                    }
                                }
                                else {
                                    _this._update.next({ error: true });
                                }
                            };
                            handleData(data);
                            index++;
                            _this._update.next({ searchIndex: index });
                            if (index < followings.length) {
                                search(index);
                            }
                            else {
                                _this._update.next({ doneSearching: true });
                            }
                        }, function (error) {
                            _this._update.next({ error: error });
                            index++;
                            _this._update.next({ searchIndex: index });
                            if (index < followings.length) {
                                search(index);
                            }
                            else {
                                _this._update.next({ doneSearching: true });
                            }
                        });
                    };
                    search(0);
                };
                HearThisService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], HearThisService);
                return HearThisService;
            }());
            exports_1("HearThisService", HearThisService);
        }
    }
});
//# sourceMappingURL=hearthis.service.js.map