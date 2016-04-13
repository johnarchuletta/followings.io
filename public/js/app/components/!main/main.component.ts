import {Component} from 'angular2/core';
import {SoundCloudService} from '../../services/soundcloud/soundcloud.service';
import {HearThisService} from '../../services/hearthis/hearthis.service';
import {BrowserDomAdapter} from 'angular2/platform/browser';
import {Observable} from "rxjs/Observable";
import {Router} from "angular2/router";

declare var SC:any;

@Component({
    templateUrl: 'js/app/components/main/main.component.html',
    styles: [`
        .row {
            margin: 0 0 25px 0;
        }
        .w50 {
            display: inline-block;
            width: 50%;
            float: left;
        }
        .align-right {
            text-align: right;
        }
        .ml15 {
            margin: 0 0 0 15px;
            padding: 6px 12px;
            border-radius: 4px;
        }
        .ct {
            text-align: center;
        }
        .bb {
            border-bottom: 1px solid #b5b5b5;
            padding-bottom: 15px;
        }
        .hidden {
            opacity: 0;
            transition: opacity 10s;
        }
        .visible {
            opacity: 1;
            transition: opacity 10s;
        }
    `],
    providers: [SoundCloudService, HearThisService]
})

export class MainComponent {
    // Global objects
    private dom:BrowserDomAdapter = new BrowserDomAdapter;
    private htUserSearch$:Observable<{}>;
    private FollowingsStatus = FollowingsStatus; // ENUM - DO NOT DELETE

    // Variables used in template
    private step:number = 1; // TEMPLATE VAR
    private htRateLimitReached:boolean = false; // TEMPLATE VAR

    // SoundCloud data
    private username:string = 'arc1';
    private user:any = [];
    private followings:any = [];

    // State variables
    private fs:FollowingsStatus = FollowingsStatus.empty;

    constructor(
        private soundcloud:SoundCloudService,
        private ht:HearThisService,
        private router: Router
    ) { }

    getSCFollowings() {
        if(this.username != null && this.username != '') {
            this.fs = FollowingsStatus.retrieving; // Notify template of state
            this.soundcloud.getAllFollowings(this.username)
                .then(data => {
                    this.user = data[0]; // The first object in array is always user info
                    this.followings = data[1]; // Second object is followings array
                    this.fs = FollowingsStatus.retrieved;
                }, error => {
                    console.log(error);
                    this.fs = FollowingsStatus.error;
                })
        } else {
            this.fs = FollowingsStatus.noUsername;
        }
    }

    findHTUsers() {
        this.htUserSearch$ = this.ht.findHTUsers(this.followings);
        this.htUserSearch$
            .subscribe((data:any) => {
                if(data === 'RATE') {
                    this.htRateLimitReached = true;
                }
            }, (error:any) => {
                console.log(error);
            });
    }
    
    nextStep() {
        this.step++;
    }
    
    previousStep() {
        this.step--;
    }
    
    test() {
        this.router.navigate(['SoundCloud'])
    }
}

enum FollowingsStatus {
    empty = 1,
    retrieving,
    retrieved,
    noUsername,
    error
}