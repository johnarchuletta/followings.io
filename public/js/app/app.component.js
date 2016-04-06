System.register(['angular2/core', "angular2/router", "./routes/intro-page/intro-page.component", "./routes/main-page/main-page.component", "./routes/help-page/help-page.component"], function(exports_1, context_1) {
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
    var core_1, router_1, intro_page_component_1, main_page_component_1, help_page_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (intro_page_component_1_1) {
                intro_page_component_1 = intro_page_component_1_1;
            },
            function (main_page_component_1_1) {
                main_page_component_1 = main_page_component_1_1;
            },
            function (help_page_component_1_1) {
                help_page_component_1 = help_page_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    // nothing
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'js/app/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/intro',
                            name: 'Intro',
                            component: intro_page_component_1.IntroPageComponent,
                        },
                        {
                            path: '/',
                            name: 'Main',
                            component: main_page_component_1.MainPageComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/how-it-works',
                            name: 'Help',
                            component: help_page_component_1.HelpPageComponent,
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map