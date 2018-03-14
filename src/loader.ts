import { Observable, Observer, Scheduler } from "rxjs";
import { IMovie, Movie } from "./movie";

export function load(url: string) {
    return Observable.create((observer: Observer<IMovie[]>) => {
        const xhr: XMLHttpRequest = new XMLHttpRequest ();

        const onLoad: () => void = () => {
            if (xhr.status === 200) {
                const data: IMovie[] = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        };

        xhr.addEventListener("load", onLoad);

        xhr.open("GET", url);
        xhr.send();

        return () =>  {
            console.log("cleanup");
            xhr.removeEventListener("load", onLoad);
            xhr.abort();
        };

    }).retryWhen(retryStrategy({attempts: 3, delay: 1500}));
}

export function loadWithFetch(url: string) {
    return Observable.defer(() => {
        return Observable.fromPromise(
            fetch(url).then(async (r) => {
                if (r.status === 200) {
                    const json: IMovie[] = await r.json();
                    return json;
                } else {
                    throw new Error(r.statusText);
                }
            }));
    }).retryWhen(retryStrategy());
}

function retryStrategy({attempts = 4, delay = 1000} = {}) {
    return function(errors: Observable<any>) {
        return errors.scan((acc, value) => {
                    acc += 1;
                    if (acc < attempts) {
                        return acc;
                    } else {
                        throw new Error(value);
                    }
                }, 0).delay(delay);
    };
}
