import { Injectable } from "@nestjs/common";
import { validate } from "email-validator";
import { IEmailValidator } from "./email-validator.interface";

@Injectable()
export class EmailValidator implements IEmailValidator {
    validate(email: string): boolean {
        return validate(email);
    }
}