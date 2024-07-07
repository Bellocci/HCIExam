import { BehaviorSubject, Observable, Observer, Subscription } from "rxjs";

export class MapHelper<K, T> {

    constructor(private initialMapState:Map<K,T>) {}

    private map:Map<K,T> = new Map<K, T>(this.initialMapState);
    private values:BehaviorSubject<T[]> = new BehaviorSubject<T[]>([... this.map.values()]);

    addObserver(observer: Observer<T[]>) : Subscription {
        return this.values.subscribe(observer);
    }

    getObservable() : Observable<T[]> {
        return this.values.asObservable();
    }

    getValues() : T[] {
        return [... this.map.values()];
    }

    addElementToMap(key : K, value : T) : boolean {
        if(this.map.has(key)) {
            return false;
        }

        this.map.set(key, value);
        this.values.getValue().push(value);
        this.values.next(this.values.getValue());
        return true;
    }

    hasElement(key: K) : boolean {
        return this.map.has(key);
    }

    getValue(key: K) : T | undefined {
        return this.map.get(key);
    }

    clearMap() : void {
        this.map.clear();
        this.values.next([]);
    }

    removeElement(key : K) : boolean {
        let result:boolean = this.map.delete(key);
        this.values.next([... this.map.values()]);
        return result;
    }

    destroy() : void {
        this.map.clear();
        this.values.unsubscribe();
    }

    complete() : void {
        this.map.clear();
        this.values.complete();
    }
}