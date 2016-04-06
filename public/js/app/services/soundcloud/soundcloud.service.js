System.register(['angular2/core'], function(exports_1, context_1) {
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
    var SoundCloudService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SoundCloudService = (function () {
                function SoundCloudService() {
                    this.clientId = '8a834fccc443cc9d97237b5ee7ed36ca';
                    this.redirectUri = 'http://localhost:3000/callback.html';
                    this.user = [];
                    SC.initialize({
                        client_id: this.clientId,
                        redirect_uri: this.redirectUri
                    });
                }
                SoundCloudService.prototype.getAllFollowings = function (username) {
                    var self = this;
                    return new Promise(function (resolve, reject) {
                        // Find user's numeric ID using their SC web address
                        SC.get('/resolve?url=http://soundcloud.com/' + username)
                            .then(function (response) {
                            // Save user's information
                            self.user = response;
                            // Get the first 50 followers
                            SC.get('/users/' + self.user.id + '/followings')
                                .then(function (response) {
                                var output = [];
                                var followings = [];
                                // This function will push the followings to a local array
                                var parseResponse = function (response) {
                                    // Iterate through delivered data, pushing to array
                                    if (response.collection.length > 0) {
                                        for (var i = 0; i < response.collection.length; i++) {
                                            followings.push(response.collection[i]);
                                        }
                                    }
                                    // If a URL to the next chunk of followings is supplied, make a request using said URL
                                    if (response.next_href) {
                                        SC.get(response.next_href.slice(27, response.next_href.length))
                                            .then(function (response) {
                                            parseResponse(response);
                                        }, function (error) {
                                            console.log(error);
                                        });
                                    }
                                    else {
                                        // If a URL was not supplied, resolve outer promise with an array of followings
                                        output.push(self.user); // The first object in the array will always be the user's information
                                        output.push(followings); // And the rest of the array contains the followings
                                        resolve(output);
                                    }
                                };
                                parseResponse(response); // Initiate recursive retrieval of SC followings
                            }, function (error) {
                                reject(error);
                            });
                        }, function (error) {
                            reject(error);
                        }); //SC.get.then
                    }); // new Promise
                }; // getAllFollowings
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