import { Observer } from "rxjs";


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