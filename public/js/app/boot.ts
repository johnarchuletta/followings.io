/// <reference path="../../../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from "angular2/http";
import {JSONP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";
import 'rxjs/Rx';

bootstrap(AppComponent, [HTTP_PROVIDERS, JSONP_PROVIDERS, ROUTER_PROVIDERS]);