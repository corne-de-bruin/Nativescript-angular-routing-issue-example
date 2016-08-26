import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class BlockScreenService {
    private showBlockScreenToggleValue: boolean;

    public showBlockScreen: Observable<boolean>;
    private showBlockScreenSource: BehaviorSubject<boolean>;


    constructor() {
        this.showBlockScreenToggleValue = false;
        this.showBlockScreenSource  = new BehaviorSubject<boolean>(this.showBlockScreenToggleValue);
        this.showBlockScreen = this.showBlockScreenSource.asObservable()
    }

    toggleShowBlockScreen() {
        this.showBlockScreenToggleValue = !this.showBlockScreenToggleValue;

        this.showBlockScreenSource.next(this.showBlockScreenToggleValue);
    }
}
