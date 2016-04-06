System.register(['angular2/core', 'angular2/http', "rxjs/Observable"], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var HearThisService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            HearThisService = (function () {
                function HearThisService(http) {
                    this.http = http;
                    // Do Nothing
                }
                HearThisService.prototype.findHTUsers = function (followings) {
                    var _this = this;
                    return new Observable_1.Observable(function (observer) {
                        // Notify controller search has begun
                        console.log('SEARCHING FOR HT USERS');
                        observer.next('SEARCHING');
                        var startTime = Date.now();
                        // This function will send requests to HearThis for each object in the followings array
                        var search = function (index) {
                            var url = 'https://api-v2.hearthis.at/search?type=user&t=' + encodeURI(followings[index].username);
                            _this.http.get(url)
                                .map(function (data) { return data.json(); })
                                .subscribe(function (data) {
                                // Handle response from HT user request
                                var handleData = function (data) {
                                    if (data != null) {
                                        // If array length is greater than 0, check first match
                                        if (data.length > 0) {
                                            // Search all matches returned for an exact match
                                            for (var i = 0; i < data.length; i++) {
                                                // Store HT & SC permalink into variables
                                                var username = followings[index].permalink;
                                                var match = '';
                                                if (data[i].permalink != null) {
                                                    match = data[i].permalink;
                                                }
                                                console.log(username + ' => ' + match);
                                                // Compare HT permalink against SC permalink
                                                if (match.length === username.length && match === username) {
                                                    // Found user
                                                    followings[index]['ht_permalink'] = data[i].permalink;
                                                    observer.next({ 'found': true, 'index': index });
                                                }
                                                else {
                                                    // User not Found
                                                    followings[index]['ht_permalink'] = '';
                                                    observer.next({ 'found': false, 'index': index });
                                                }
                                            }
                                        }
                                        else {
                                            // data array length is 0, but a single object may have been returned with rate limit info
                                            if (data.success === false) {
                                                // HT rate limit reached
                                                var elapsedTime = Date.now() - startTime;
                                                var duration = _this.msToStr(elapsedTime);
                                                console.log('RATE LIMIT REACHED / ' + index + ' / ' + duration);
                                                index = followings.length;
                                                observer.next('RATE');
                                            }
                                            else {
                                                // Empty array returned, thus no match found
                                                console.log('');
                                                followings[index]['ht_permalink'] = '';
                                                observer.next({ 'found': false, 'index': index });
                                            }
                                        }
                                    }
                                    else {
                                        console.log('ERROR(' + index + '): ' + Date.now());
                                        index = followings.length;
                                        observer.next('ERROR');
                                    }
                                };
                                // Handle response sent back from HT
                                handleData(data);
                                // Increment array index
                                index++;
                                // If index is less than followings.length, send next request
                                if (index < followings.length) {
                                    setTimeout(function () {
                                        search(index);
                                    }, 0);
                                }
                                else {
                                    var elapsedTime = Date.now() - startTime;
                                    var duration = _this.msToStr(elapsedTime);
                                    console.log('DONE SEARCHING / ' + duration);
                                }
                            }, function (error) {
                                observer.next(error);
                            });
                        };
                        search(0); // Initiate recursive query to HearThis starting at followings[0]
                    });
                };
                HearThisService.prototype.msToStr = function (milliseconds) {
                    function numberEnding(number) {
                        return (number > 1) ? 's' : '';
                    }
                    var temp = Math.floor(milliseconds / 1000);
                    var years = Math.floor(temp / 31536000);
                    if (years) {
                        return years + ' year' + numberEnding(years);
                    }
                    var days = Math.floor((temp %= 31536000) / 86400);
                    if (days) {
                        return days + ' day' + numberEnding(days);
                    }
                    var hours = Math.floor((temp %= 86400) / 3600);
                    if (hours) {
                        return hours + ' hour' + numberEnding(hours);
                    }
                    var minutes = Math.floor((temp %= 3600) / 60);
                    if (minutes) {
                        return minutes + ' minute' + numberEnding(minutes);
                    }
                    var seconds = temp % 60;
                    if (seconds) {
                        return seconds + ' second' + numberEnding(seconds);
                    }
                    return 'less than a second'; //'just now' //or other string you like;
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