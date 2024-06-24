export class Task {
    readonly title: string;
    readonly description?: string;
    readonly finished: boolean;

    constructor(
        title: string,
        description?: string,
        finished: boolean = false,
    ) {
        this.title = title;
        this.description = description;
        this.finished = finished;
    }
}
