System.register(['angular2/core', 'angular2/router', './services/app/app.service', './services/user/user.service', './components/navigation/navigation.component', './components/login/login.component', './components/register/register.component', './components/account/account.component', './directives/fade-in/fade-in.directive', './services/soundcloud/soundcloud.service', './services/hearthis/hearthis.service', './components/search/search.component', './services/mixcloud/mixcloud.service', "angular2/src/platform/browser/browser_adapter"], function(exports_1, context_1) {
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
    var core_1, router_1, app_service_1, user_service_1, navigation_component_1, login_component_1, register_component_1, account_component_1, fade_in_directive_1, soundcloud_service_1, hearthis_service_1, search_component_1, mixcloud_service_1, browser_adapter_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (navigation_component_1_1) {
                navigation_component_1 = navigation_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (account_component_1_1) {
                account_component_1 = account_component_1_1;
            },
            function (fade_in_directive_1_1) {
                fade_in_directive_1 = fade_in_directive_1_1;
            },
            function (soundcloud_service_1_1) {
                soundcloud_service_1 = soundcloud_service_1_1;
            },
            function (hearthis_service_1_1) {
                hearthis_service_1 = hearthis_service_1_1;
            },
            function (search_component_1_1) {
                search_component_1 = search_component_1_1;
            },
            function (mixcloud_service_1_1) {
                mixcloud_service_1 = mixcloud_service_1_1;
            },
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_appService) {
                    var _this = this;
                    this._appService = _appService;
                    this.loginStatus = false;
                    this.currentSection = 'login';
                    this._appService.observable$.subscribe(function (object) {
                        _this.appUpdate(object);
                    });
                }
                AppComponent.prototype.appUpdate = function (update) {
                    if (update.currentSection) {
                        this.currentSection = update.currentSection;
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'js/app/app.component.html',
                        styleUrls: ['js/app/app.component.css'],
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            fade_in_directive_1.FadeInDirective,
                            navigation_component_1.NavigationComponent,
                            login_component_1.LoginComponent,
                            register_component_1.RegisterComponent,
                            account_component_1.AccountComponent,
                            search_component_1.SearchComponent
                        ],
                        providers: [
                            browser_adapter_1.BrowserDomAdapter,
                            app_service_1.AppService,
                            user_service_1.UserService,
                            soundcloud_service_1.SoundCloudService,
                            hearthis_service_1.HearThisService,
                            mixcloud_service_1.MixCloudService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            name: 'Login',
                            component: login_component_1.LoginComponent,
                            path: '/'
                        },
                        {
                            name: 'Register',
                            component: register_component_1.RegisterComponent,
                            path: '/register'
                        },
                        {
                            name: 'Followings',
                            component: account_component_1.AccountComponent,
                            path: '/followings'
                        },
                        {
                            name: 'Search',
                            component: search_component_1.SearchComponent,
                            path: '/search'
                        }
                    ]), 
                    __metadata('design:paramtypes', [app_service_1.AppService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map