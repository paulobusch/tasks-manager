import { IViewModel } from "@interfaces/action-view-model.interface";
import { Shape } from "@metadata/shape-type";
import { Converter } from "@metadata/converter";
import { TokenData } from "../models/token-data";
import { Attribute } from "@decorators/attribute";

export class AuthResult implements IViewModel {
    @Attribute() public tokenData: TokenData;
    @Attribute() public tokenStr: string;

    constructor(data: Shape<AuthResult>) {
        Converter.assign(this, data);
    }
}