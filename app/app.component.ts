import {Component, OnInit, NgZone, OnDestroy} from "@angular/core";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import application = require('application');
import {BlockScreenService} from './shared/block-screen.service';
import {APP_ROUTES} from './routes';
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    providers: [BlockScreenService],
    directives: [NS_ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private zone:NgZone,
                private blockScreenService: BlockScreenService,
                private router:RouterExtensions) {
    }

    ngOnInit(): void {
        this.checkForBlockScreen();

        application.on(application.resumeEvent, () => {
            this.zone.run(() => {
                this.blockScreenService.toggleShowBlockScreen();
                this.checkForBlockScreen();
            });
        });
    }

    ngOnDestroy(): void {
        application.off(application.resumeEvent);
    }

    private checkForBlockScreen(): void {
        this.blockScreenService.showBlockScreen
            .subscribe(res => {
                if(res === true) {
                    this.router.navigate([APP_ROUTES.BLOCKSCREEN]);
                }
            });
    }
}
