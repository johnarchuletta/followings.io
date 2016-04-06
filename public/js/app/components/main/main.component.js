System.register(['angular2/core', '../../services/soundcloud/soundcloud.service', '../../services/hearthis/hearthis.service', 'angular2/platform/browser'], function(exports_1, context_1) {
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
    var core_1, soundcloud_service_1, hearthis_service_1, browser_1;
    var MainComponent, FollowingsStatus;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (soundcloud_service_1_1) {
                soundcloud_service_1 = soundcloud_service_1_1;
            },
            function (hearthis_service_1_1) {
                hearthis_service_1 = hearthis_service_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            MainComponent = (function () {
                function MainComponent(soundcloud, ht) {
                    this.soundcloud = soundcloud;
                    this.ht = ht;
                    this.username = 'pascalfeos';
                    this.step = 1; // TEMPLATE VAR
                    this.user = [];
                    this.followings = [];
                    this.FollowingsStatus = FollowingsStatus; // ENUM - DO NOT DELETE
                    this.fs = FollowingsStatus.empty;
                    this.htRateLimitReached = true; // TEMPLATE VAR
                    this.dom = new browser_1.BrowserDomAdapter;
                    // Do nothing.
                }
                MainComponent.prototype.getSCFollowings = function () {
                    var _this = this;
                    if (this.username != null && this.username != '') {
                        this.fs = FollowingsStatus.retrieving; // Notify template of state
                        this.soundcloud.getAllFollowings(this.username)
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
                    this.htUserSearch$ = this.ht.findHTUsers(this.followings);
                    this.htUserSearch$
                        .subscribe(function (data) {
                        if (data === 'RATE') {
                            _this.htRateLimitReached = true;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                };
                MainComponent.prototype.test = function () {
                    var e = this.dom.query('#rate-msg');
                    console.log(e);
                    this.dom.setStyle(e, 'transform', 'translate(-50%, -1150%)');
                };
                MainComponent.prototype.nextStep = function () {
                    this.step++;
                };
                MainComponent.prototype.previousStep = function () {
                    this.step--;
                };
                MainComponent = __decorate([
                    core_1.Component({
                        selector: 'main-component',
                        templateUrl: 'js/app/components/main/main.component.html',
                        styles: ["\n        .row {\n            margin: 0 0 25px 0;\n        }\n        .w50 {\n            display: inline-block;\n            width: 50%;\n            float: left;\n        }\n        .align-right {\n            text-align: right;\n        }\n        .ml15 {\n            margin: 0 0 0 15px;\n            padding: 6px 12px;\n            border-radius: 4px;\n        }\n        .ct {\n            text-align: center;\n        }\n        .bb {\n            border-bottom: 1px solid #b5b5b5;\n            padding-bottom: 15px;\n        }\n        .hidden {\n            opacity: 0;\n            transition: opacity 10s;\n        }\n        .visible {\n            opacity: 1;\n            transition: opacity 10s;\n        }\n    "],
                        providers: [soundcloud_service_1.SoundCloudService, hearthis_service_1.HearThisService]
                    }), 
                    __metadata('design:paramtypes', [soundcloud_service_1.SoundCloudService, hearthis_service_1.HearThisService])
                ], MainComponent);
                return MainComponent;
            }());
            exports_1("MainComponent", MainComponent);
            (function (FollowingsStatus) {
                FollowingsStatus[FollowingsStatus["empty"] = 1] = "empty";
                FollowingsStatus[FollowingsStatus["retrieving"] = 2] = "retrieving";
                FollowingsStatus[FollowingsStatus["retrieved"] = 3] = "retrieved";
                FollowingsStatus[FollowingsStatus["noUsername"] = 4] = "noUsername";
                FollowingsStatus[FollowingsStatus["error"] = 5] = "error";
            })(FollowingsStatus || (FollowingsStatus = {}));
        }
    }
});
//# sourceMappingURL=main.component.js.map