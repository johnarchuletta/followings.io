import {Injectable} from 'angular2/core';

declare let SC:any;

@Injectable()
export class SoundCloudService {
    private clientId:string = '8a834fccc443cc9d97237b5ee7ed36ca';
    private redirectUri:string = 'http://localhost:3000/callback.html';
    private user:any = [];

    constructor() {
        SC.initialize({
            client_id: this.clientId,
            redirect_uri: this.redirectUri
        });
    }
    
    getAllFollowings(username:string) {
        let self = this;
        return new Promise((resolve, reject) => {

            // Find user's numeric ID using their SC web address
            SC.get('/resolve?url=http://soundcloud.com/' + username)
                .then((response:any) => {

                    // Save user's information
                    self.user = response;

                    // Get the first 50 followers
                    SC.get('/users/' + self.user.id + '/followings')
                        .then(response => {

                            let output:any = [];
                            let followings:any = [];

                            // This function will push the followings to a local array
                            let parseResponse = (response:any) => {
                                
                                // Iterate through delivered data, pushing to array
                                if(response.collection.length > 0) {
                                    for(let i = 0; i < response.collection.length; i++) {
                                        followings.push(response.collection[i]);
                                    }
                                }
                                
                                // If a URL to the next chunk of followings is supplied, make a request using said URL
                                if(response.next_href) {
                                    SC.get(response.next_href.slice(27, response.next_href.length))
                                        .then(response => {
                                            parseResponse(response);
                                        }, error => {
                                            console.log(error);
                                        });
                                } else {
                                    
                                    // If a URL was not supplied, resolve outer promise with an array of followings
                                    output.push(self.user); // The first object in the array will always be the user's information
                                    output.push(followings); // And the rest of the array contains the followings
                                    resolve(output);
                                }
                            };
                            parseResponse(response); // Initiate recursive retrieval of SC followings
                        }, error => {
                            reject(error)
                        });
                }, error => {
                    reject(error);
                }); //SC.get.then
        }); // new Promise
    } // getAllFollowings
}