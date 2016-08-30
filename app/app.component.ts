import {Component, OnInit, NgZone, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import application = require('application');
import {BlockScreenService} from './shared/block-screen.service';
import {APP_ROUTES} from './routes';
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';
import {Subscription} from "rxjs";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    providers: [BlockScreenService],
    directives: [NS_ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    constructor(private zone: NgZone,
        private blockScreenService: BlockScreenService,
        private router: RouterExtensions,
        routerNG: Router) {

        routerNG.events.subscribe((e) => {
            console.log("--EVENT-->: " + e.toString());
        });
    }


    ngOnInit(): void {
        console.log("AppComponent.ngOnInit()");
        this.checkForBlockScreen();

        application.on(application.resumeEvent, () => {
            console.log("----> application.resumeEvent");

            this.zone.run(() => {
                this.blockScreenService.toggleShowBlockScreen();
                this.checkForBlockScreen();
            });
        });
    }

    ngOnDestroy(): void {
        application.off(application.resumeEvent);
        this.subscription.unsubscribe();
    }

    private checkForBlockScreen(): void {
        console.log("----> checkForBlockScreen");
        if (!this.subscription) {
            console.log("----> checkForBlockScreen - subscribing ....");
            this.subscription = this.blockScreenService.showBlockScreen
                .subscribe(res => {
                    if (res === true) {
                        console.log("navigating to blockscreen");

                        this.router.navigate([APP_ROUTES.BLOCKSCREEN]);
                    }
                });
        }
    }
}
