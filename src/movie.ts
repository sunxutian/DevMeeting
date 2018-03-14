export interface IMovie {
    title: string;
}

export class Movie implements IMovie {
    public title: string;
    private ratings: number;

    get Ratings(): number {
        return this.ratings;
    }
    set Ratings(ratings: number) {
        this.ratings = ratings;
    }
}
