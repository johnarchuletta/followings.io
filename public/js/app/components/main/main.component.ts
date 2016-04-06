import {Component} from 'angular2/core';
import {SoundCloudService} from '../../services/soundcloud/soundcloud.service';
import {HearThisService} from '../../services/hearthis/hearthis.service';
import {BrowserDomAdapter} from 'angular2/platform/browser';
import {Observable} from "rxjs/Observable";

declare var SC:any;

@Component({
    selector: 'main-component',
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
    private username:string = 'pascalfeos';
    private step:number = 1; // TEMPLATE VAR
    private user:any = [];
    private followings:any = [];
    private FollowingsStatus = FollowingsStatus; // ENUM - DO NOT DELETE
    private fs:FollowingsStatus = FollowingsStatus.empty;
    private htRateLimitReached:boolean = true; // TEMPLATE VAR
    private htUserSearch$:Observable<{}>;
    private dom:BrowserDomAdapter = new BrowserDomAdapter;

    constructor(private soundcloud:SoundCloudService, private ht:HearThisService) {
        // Do nothing.
    }

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

    test() {
        let e:any = this.dom.query('#rate-msg');
        console.log(e);
        this.dom.setStyle(e, 'transform', 'translate(-50%, -1150%)');
    }
    
    nextStep() {
        this.step++;
    }
    
    previousStep() {
        this.step--;
    }
}

enum FollowingsStatus {
    empty = 1,
    retrieving,
    retrieved,
    noUsername,
    error
}