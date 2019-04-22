import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataShareService {
    sharedObject: any = {};
    data: any = new BehaviorSubject(null);

    public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.data.next(this.sharedObject);
    }

    public setData(key: string, value: any) {
        this.sharedObject[key] = value;
        this.data.next(this.sharedObject);
    }

    showLoader(value: boolean) {
        this.loaderStatus.next(value);
    }
     hideLoader() {
        this.loaderStatus.next(false);
    }

}


