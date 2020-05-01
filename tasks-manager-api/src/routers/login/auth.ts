import { Mutation } from "@bases/action-bases";
import { Validators } from "@metadata/validators";
import { Property } from "@decorators/property";
import { MutationResult } from "@results/action-result";
import { EActionStatus } from "@enums/action-status.enum";
import { ActionContext } from "@metadata/action-context";
import { User } from "@models/users/entities/user";
import jwt from "jsonwebtoken";
import { Bcrypt } from "@hashing/bcrypt";
import { TokenData } from "@models/login/models/token-data";
import { AuthResult } from "@models/login/view-models/auth-result";

export class Auth extends Mutation {
    @Property([Validators.required])
    public login: string;

    @Property([Validators.required])
    public password: string;
    
    async consistent(): Promise<MutationResult> {
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const query = { 
            attributes: ['id', 'name', 'password'],
            where: { login: this.login } 
        };
        const user = await User.findOne(query);
        if (!user) return new MutationResult(EActionStatus.unauthorized);
        const valid = await Bcrypt.validate(this.password, user.password);
        if (!valid) return new MutationResult(EActionStatus.unauthorized);
        const tokenData = new TokenData({ id: user.id, name: user.name });
        const tokenStr = tokenData.newToken();
        var result = new AuthResult({ tokenData, tokenStr });
        return new MutationResult(EActionStatus.success, undefined, result);
    }
}