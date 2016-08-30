import {Component, OnInit, OnDestroy} from "@angular/core";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import application = require('application');
import {Page} from 'ui/page';
import {Frame} from 'ui/frame';
import {BlockScreenService} from '../shared/block-screen.service';
import {APP_ROUTES} from '../routes';
import {Subscription} from "rxjs";
@Component({
    selector: "BlockScreen",
    templateUrl: "./+block-screen/block-screen.component.html"
})
export class BlockScreenComponent implements OnInit, OnDestroy {
    private subscribtion : Subscription; 
    constructor(private router: RouterExtensions,
        private blockScreenService: BlockScreenService,
        private frame: Frame,
        private page: Page) { }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;

        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }

        this.subscribtion = this.blockScreenService.showBlockScreen.subscribe(
            res => {
                this.handleShowBlockScreenUpdate(res);
            }
        );
    }

    ngOnDestroy(): void {
        if (application.android) {
            application.android.off(application.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
        this.subscribtion.unsubscribe();
    }

    backEvent(args) {
        args.cancel = true;
    }

    private handleShowBlockScreenUpdate(showBlockScreen: boolean): void {
        // The actionBarHide and Show are called here to prevent the bar from visible
        // for a few seconds once the maintenance screen is shown.
        if (showBlockScreen === false) {
            // console.log('frame.canGoBack(): ', this.frame.canGoBack());
            if (this.frame.canGoBack() === true) {
                // console.log('router back');
                this.router.back();
            } else {
                // console.log('route to home');
                this.router.navigate([APP_ROUTES.HOME]);
            }
        }
    }
}
