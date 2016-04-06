import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {IntroPageComponent} from "./routes/intro-page/intro-page.component";
import {MainPageComponent} from "./routes/main-page/main-page.component";
import {HelpPageComponent} from "./routes/help-page/help-page.component";

@Component({
    selector: 'app',
    templateUrl: 'js/app/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/intro',
        name: 'Intro',
        component: IntroPageComponent,
    },
    {
        path: '/',
        name: 'Main',
        component: MainPageComponent,
        useAsDefault: true
    },
    {
        path: '/how-it-works',
        name: 'Help',
        component: HelpPageComponent,
    }
])

export class AppComponent {
    constructor() {
        // nothing
    }
}