import { Mutation } from "@bases/action-bases";
import { Property } from "@decorators/property";
import { validator } from "sequelize/types/lib/utils/validator-extras";
import { Validators } from "@metadata/validators";
import { MutationResult } from "@results/action-result";
import { User } from "@models/users/entities/user";
import { EActionStatus } from "@enums/action-status.enum";
import { ActionContext } from "@metadata/action-context";
import { Bcrypt } from "@hashing/bcrypt";

export class CreateUser extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    @Property([Validators.required, Validators.lenght({ min: 5, max: 200 })])
    public name: string;
    
    @Property([Validators.required, Validators.email])
    public email: string;
    
    @Property([Validators.required, Validators.lenght({ min: 5, max: 50 })])
    public login: string;

    @Property([Validators.required, Validators.lenght({ min: 5, max: 10 })])
    public password: string;

    async consistent(): Promise<MutationResult> {
        const existsName = await User.findOne({ where: { name: this.name } });
        if (existsName) return new MutationResult(EActionStatus.conflict, 'User with name already exists');
        const existsEmail = await User.findOne({ where: { email: this.email } });
        if (existsEmail) return new MutationResult(EActionStatus.conflict, 'User with email already exists'); 
        const existsLogin = await User.findOne({ where: { login: this.login } });
        if (existsLogin) return new MutationResult(EActionStatus.conflict, 'User with login already exists');
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const user = new User({
            id: this.id,
            name: this.name,
            email: this.email,
            login: this.login,
            password: await Bcrypt.encript(this.password)
        });
        const result = await user.save();
        if (!result) return new MutationResult(EActionStatus.error);
        return new MutationResult(EActionStatus.success); 
    }
}