export class Name {
    readonly complete: string;
    readonly firstName: string;
    readonly lastName: string;

    constructor(complete: string) {
        this.complete = complete;
        this.firstName = this.getFirstName(this.complete);
        this.lastName = this.getLastName(this.complete);
    }

    private getFirstName(fullName: string) {
        return fullName.split(' ')[0];
    }

    private getLastName(fullName: string) {
        return fullName.split(' ').slice(1).join(' ');
    }
}
