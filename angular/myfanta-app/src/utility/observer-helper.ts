import { BehaviorSubject, Observable, Observer, Subscription } from "rxjs";

export class ObservableHelper<T> {

    private subject:BehaviorSubject<T>;

    constructor(initialState:T) {
        this.subject = new BehaviorSubject<T>(initialState);
    }

    setValue(value:T) : void {
        this.subject.next(value);
    }

    getValue() : T {
        return this.subject.getValue();
    }

    addObserver(observer:Observer<T>) : Subscription | undefined {
        return observer != undefined ? this.subject.subscribe(observer) : undefined;
    }

    getObservable() : Observable<T> {
        return this.subject.asObservable();
    }

    /**
     * Annulla tutte le iscrizioni e rilascia le risorse associate all'oggetto
     */
    destroy() : void {
        this.subject.unsubscribe();
    }

    /**
     * Completa il subject non emettendo più valori e annullando tutte le iscrizioni
     */
    complete() : void {
        this.subject.complete();
    }
}