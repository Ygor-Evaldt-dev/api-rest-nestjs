export class Task {
    readonly id: number;
    readonly title: string;
    readonly description?: string;
    readonly finished: boolean;

    constructor(
        id: number,
        title: string,
        description?: string,
        finished: boolean = false,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.finished = finished;
    }
}
