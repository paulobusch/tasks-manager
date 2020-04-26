import { Mutation } from "@bases/action-bases";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { MutationResult } from "@results/action-result";
import { EActionStatus } from "@enums/action-status.enum";
import { ActionContext } from "@metadata/action-context";
import { User } from "@models/users/entities/user";

export class DeleteUser extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    async consistent(): Promise<MutationResult> {
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const query = { where: { id: this.id } };
        const user = await User.findOne(query);
        if (!user) return new MutationResult(EActionStatus.notFound, 'User with id does not exists');
        await user.destroy();
        return new MutationResult(EActionStatus.success);
    }
}