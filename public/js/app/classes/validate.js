System.register(["angular2/core"], function(exports_1, context_1) {
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
    var core_1;
    var Validate;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Validate = (function () {
                function Validate() {
                }
                Validate.username = function (control) {
                    var value = control.value.trim();
                    var exp = /^[a-zA-Z0-9_-]{3,16}$/;
                    var result = exp.test(value);
                    if (result && !control.pristine) {
                        return null;
                    }
                    else {
                        return { 'invalidUsername': true };
                    }
                };
                Validate.password = function (control) {
                    var value = control.value.trim();
                    var exp = /^[a-zA-Z0-9_-]{6,18}$/;
                    var result = exp.test(value);
                    if (result && !control.pristine) {
                        return null;
                    }
                    else {
                        return { 'invalidPassword': true };
                    }
                };
                Validate.matchPasswords = function (controlArray) {
                    if (controlArray.controls[0].value === controlArray.controls[1].value) {
                        return null;
                    }
                    else {
                        return { 'passwordMismatch': true };
                    }
                };
                Validate.email = function (control) {
                    var value = control.value.trim();
                    var exp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
                    var result = exp.test(value);
                    if (result && !control.pristine) {
                        return null;
                    }
                    else {
                        return { 'invalidEmail': true };
                    }
                };
                Validate.soundcloudUrl = function (control) {
                    var value = control.value.trim();
                    var exp = /^[a-zA-Z0-9_-]{3,24}$/;
                    var result = exp.test(value);
                    if (result && !control.pristine) {
                        return null;
                    }
                    else {
                        return { 'invalidSoundcloudUrl': true };
                    }
                };
                Validate = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Validate);
                return Validate;
            }());
            exports_1("Validate", Validate);
        }
    }
});
//# sourceMappingURL=validate.js.map