import { Observer } from "rxjs";

// FIXME: Vedere come aggiungere pipe, map e shareReplay e correggere i vari observer
export class ObserverStepBuilder<T> {

    private observer: Partial<Observer<T>> = {};

    next(nextFn: (value: T) => void): this {
        this.observer.next = nextFn;
        return this;
    }
    
    error(errorFn: (error: any) => void): this {
        this.observer.error = errorFn;
        return this;
    }

    complete(completeFn: () => void): this {
        this.observer.complete = completeFn;
        return this;
    }

    build(): Observer<T> {
        return this.observer as Observer<T>;
    }

}