System.register(["angular2/core", "rxjs/Subject"], function(exports_1, context_1) {
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
    var AppService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            AppService = (function () {
                function AppService() {
                    this._update = new Subject_1.Subject();
                    this.observable$ = this._update.asObservable();
                    this._loginStatus = false;
                    this._currentSection = 'login';
                    // Do nothing
                }
                Object.defineProperty(AppService.prototype, "loginStatus", {
                    get: function () {
                        return this._loginStatus;
                    },
                    set: function (status) {
                        this._loginStatus = status;
                        this._update.next({ 'loginStatus': this._loginStatus });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppService.prototype, "currentSection", {
                    get: function () {
                        return this._currentSection;
                    },
                    set: function (section) {
                        this._currentSection = section;
                        this._update.next({ 'currentSection': this._currentSection });
                    },
                    enumerable: true,
                    configurable: true
                });
                AppService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AppService);
                return AppService;
            }());
            exports_1("AppService", AppService);
        }
    }
});
//# sourceMappingURL=app.service.js.map