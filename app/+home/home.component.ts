import {Component} from "@angular/core";
import {RouterExtensions} from 'nativescript-angular/router';
import {APP_ROUTES} from '../routes';

@Component({
    selector: "Home",
    templateUrl: "./+home/home.component.html",
})
export class HomeComponent {

    constructor(private router: RouterExtensions) {}

    public goToSecondScreen() {
        this.router.navigate([APP_ROUTES.SECONDSCREEN]);
    }
}
