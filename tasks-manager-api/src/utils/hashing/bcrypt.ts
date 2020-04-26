import bcrypt from 'bcrypt';

export class Bcrypt {
    private static concatPass(pass: string): string {
        return process.env.SECRET + pass;
    }

    public static async validate(pass, hash): Promise<boolean> {
        return await bcrypt.compare(Bcrypt.concatPass(pass), hash);
    }

    public static async encript(pass): Promise<string> {
        return await bcrypt.hash(Bcrypt.concatPass(pass), 8);
    }
}