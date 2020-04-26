import { IViewModel } from "@interfaces/action-view-model.interface";
import { User } from "../entities/user";
import { Converter } from "@metadata/converter";
import { Attribute } from "@decorators/attribute";

export class UserList implements IViewModel {
    @Attribute() public id: string;
    @Attribute() public name: string;
    @Attribute() public email: string;

    public static map(model: User): UserList {
        const user = model.get();
        return Converter.assign(new UserList(), user);
    }
}