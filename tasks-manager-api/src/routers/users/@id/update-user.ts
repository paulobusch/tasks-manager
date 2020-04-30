import { Mutation } from "@bases/action-bases";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { ActionContext } from "@metadata/action-context";
import { MutationResult } from "@results/action-result";
import { User } from "@models/users/entities/user";
import { Op } from "sequelize";
import { EActionStatus } from "@enums/action-status.enum";

export class UpdateUser extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    @Property([Validators.required, Validators.lenght({ max: 200 })])
    public name: string;
    
    @Property([Validators.required, Validators.email])
    public email: string;
    
    @Property([Validators.required, Validators.lenght({ max: 50 })])
    public login: string;

    @Property([Validators.required, Validators.lenght({ max: 10 })])
    public password: string;

    async consistent(): Promise<MutationResult> {
        const existsName = await User.findOne({ where: { name: this.name, id: { [Op.not]: this.id } } });
        if (existsName) return new MutationResult(EActionStatus.conflict, 'User with name already exists');
        const existsEmail = await User.findOne({ where: { email: this.email, id: { [Op.not]: this.id } } });
        if (existsEmail) return new MutationResult(EActionStatus.conflict, 'User with email already exists');
        const existsLogin = await User.findOne({ where: { login: this.login, id: { [Op.not]: this.login } } });
        if (existsLogin) return new MutationResult(EActionStatus.conflict, 'User with login already exists');
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const query = { where: { id: this.id } };
        const user = await User.findOne(query);
        if (!user) return new MutationResult(EActionStatus.notFound, 'User with id does not exists');
        user.set({
            name: this.name,
            email: this.email,
            login: this.login
        });
        const result = await user.save();
        if (!result) return new MutationResult(EActionStatus.error);
        return new MutationResult(EActionStatus.success);
    }
}