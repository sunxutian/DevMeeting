import { Observable, Observer } from "rx";
import { map, throttle, merge } from "rxjs/operators";

const dummySubscriber: Observer<number> = Observer.create(
    (value: number) => console.log(value),
    (error) => console.log(error),
    () => console.log("complete"),
);

// Observable.of(1, 2, 3).subscribe(dummySubscriber);

const testObservable: Observable<number> = Observable.create((observer) => {
    let i = 0;
    const timesout = window.setInterval(
        () => {
            observer.onNext(i++);
        }, 50);

    return () => {
        clearInterval(timesout);
    };
});

testObservable
.throttle(1000)
.where((v) => v % 2 === 0)
.subscribe(dummySubscriber);
