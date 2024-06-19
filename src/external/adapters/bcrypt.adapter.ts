import { hash, compare } from 'bcrypt';
import { IEncrypter } from "src/ports/encrypter.interface";

export class BcryptAdapter implements IEncrypter {
    private saltRounds: number = 12;

    async hash(password: string): Promise<string> {
        return await hash(password, this.saltRounds);
    }
    async compare(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);;
    }

}