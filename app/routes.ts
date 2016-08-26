import {RouterConfig} from '@angular/router';
import {HomeComponent} from './+home/home.component';
import {nsProvideRouter} from 'nativescript-angular/router';
import {SecondScreenComponent} from './+second-screen/second-screen.component';
import {BlockScreenComponent} from './+block-screen/block-screen.component';

export const APP_ROUTES = {
    HOME: 'home',
    SECONDSCREEN: 'secondscreen',
    BLOCKSCREEN: 'blockscreen'
};

const routes:RouterConfig = [
    {path: '', redirectTo: APP_ROUTES.HOME, terminal: true},
    {path: APP_ROUTES.HOME, component: HomeComponent},
    {path: APP_ROUTES.SECONDSCREEN, component: SecondScreenComponent},
    {path: APP_ROUTES.BLOCKSCREEN, component: BlockScreenComponent},
    ];

export const APP_ROUTER_PROVIDERS = [
    nsProvideRouter(routes, {enableTracing: false})
];
