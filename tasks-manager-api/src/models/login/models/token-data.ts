import { Shape } from "@metadata/shape-type";
import { Converter } from "@metadata/converter";
import { Attribute } from "@decorators/attribute";
import jwt from "jsonwebtoken";

export class TokenData {
    @Attribute() public id: string;
    @Attribute() public name: string;

    constructor(data?: { 
        id: string,
        name: string
     }) {
        Converter.assign(this, data);
    }

    public newToken(): string {
        return jwt.sign(
            this.toJSON(), 
            process.env.SECRET as string, 
            { expiresIn: parseInt(process.env.EXPIRATION_TOKEN as string) }
        );
    }

    public toJSON(): any {
        return {
            id: this.id,
            name: this.name
        };
    }
}