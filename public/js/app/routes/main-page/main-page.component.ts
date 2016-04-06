import {Component} from 'angular2/core';

import {MainComponent} from '../../components/main/main.component';

@Component({
    templateUrl: 'js/app/routes/main-page/main-page.html',
    directives: [MainComponent]
})

export class MainPageComponent {
    constructor() {
    }
}