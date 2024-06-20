export class Email {
    readonly complete: string;
    readonly provider: string;

    constructor(complete: string) {
        this.complete = complete;
        this.provider = this.getProvider(this.complete);
    }

    private getProvider(email: string) {
        return email.split('@')[1].split('.')[0];
    }
}
