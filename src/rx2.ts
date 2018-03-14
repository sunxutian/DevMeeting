import { map, mergeAll, merge, take, delay, pairwise, race, startWith, filter } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { interval } from "rxjs/observable/interval";
import { pipe } from "rxjs/Rx";

const takeEveryN = (n: number) => filter((value, index) => index % n === 0);

const source$ = interval(500).pipe(take(5));

/*
  interval is emitting a value every 0.5s.  This value is then being mapped to interval that
  is delayed for 1.0s.  The mergeAll operator takes an optional argument that determines how
  many inner observables to subscribe to at a time.  The rest of the observables are stored
  in a backlog waiting to be subscribe.
*/
const example = source$
    .pipe(map(val => source$.pipe(delay(1000), take(3))), mergeAll(2))
    .subscribe(val => console.log(val));

// interval(1000).pipe(pairwise(), take(5)).subscribe(console.log);

// const ofSource = of(1, 2, 3);
// ofSource.pipe(startWith(0), startWith(-1)).subscribe(console.log);
