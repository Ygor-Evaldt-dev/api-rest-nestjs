/*
export class User {
    id: number;
    email: string;
    password: string;
    name?: string;
    phone?: string;
}
*/

import { Email } from 'src/shared/value-objects/email';
import { Name } from 'src/shared/value-objects/name';

export class User {
    readonly id: number;
    readonly email: Email;
    readonly password?: string;
    readonly name?: Name;
    readonly phone?: string;

    constructor(
        id: number,
        email: string,
        password: string,
        name?: string,
        phone?: string,
    ) {
        this.id = id;
        this.email = new Email(email);
        this.password = password;
        if (name) this.name = new Name(name);
        this.phone = phone;
    }
}
