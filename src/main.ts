import { load, loadWithFetch } from "./loader";
import { IMovie } from "./movie";
import { filter, map, delay } from "rxjs/operators";
import { fromEvent } from "rxjs/observable/fromEvent";

const circle = document.getElementById("circle");
const output = document.getElementById("output");
const button = document.getElementById("button");
const click = fromEvent(button, "click");

/*Circle*/
const source = fromEvent(window, "mousemove").pipe(
    map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY })),
    filter(pos => pos.x > 500),
    delay(100));
source.subscribe(pos => {
    circle.style.left = `${pos.x}`;
    circle.style.top = `${pos.y}`;
});

function renderMovies(movies: IMovie[]) {
    movies.forEach((m) => {
        const div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

const subscription =
    load("movies.json")
        .subscribe(renderMovies,
            (e) => console.log(`error: ${e}`),
            () => console.log("complete!"));

console.log(subscription);
// subscription.unsubscribe();

click.mergeMap((e) => loadWithFetch("movies.json"))
    .subscribe(
        renderMovies,
        (e) => console.log(`error: ${e}`),
        () => console.log("complete"),
);
