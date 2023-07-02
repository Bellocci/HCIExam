import { BehaviorSubject, Observable, Observer } from "rxjs";

export class ObserverHelper<T> {

    private subject:BehaviorSubject<T>;
    private observable:Observable<T>;

    constructor(initialState:T) {
        this.subject = new BehaviorSubject<T>(initialState);
        this.observable = this.subject.asObservable();
    }

    setValue(value:T) : void {
        this.subject.next(value);
    }

    addObserver(observer:Observer<T>) : void {
        this.observable.subscribe(observer);
    }

    getObservable() : Observable<T> {
        return this.observable;
    }
}