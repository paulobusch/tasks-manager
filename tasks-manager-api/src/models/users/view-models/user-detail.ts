import { IViewModel } from "@interfaces/action-view-model.interface";
import { User } from "../entities/user";
import { Converter } from "@metadata/converter";
import { Attribute } from "@decorators/attribute";

export class UserDetail implements IViewModel {
    @Attribute() public id: string;
    @Attribute() public name: string;
    @Attribute() public email: string;
    @Attribute() public login: string;

    public static map(model: User): UserDetail {
        const user = model.get();
        return Converter.assign(new UserDetail(), user); 
    }
}