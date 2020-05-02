import { Mutation } from "@bases/action-bases";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { ActionContext } from "@metadata/action-context";
import { MutationResult } from "@results/action-result";
import { EActionStatus } from "@enums/action-status.enum";
import { TaskGroup } from "@models/tasks/entities/task-group";

export class DeleteTaskGroup extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    async consistent(): Promise<MutationResult> {
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const query = { where: { id: this.id } };
        const taskGroup = await TaskGroup.findOne(query);
        if (!taskGroup) return new MutationResult(EActionStatus.notFound);
        taskGroup.set({ id_user_deleted: context.data.id });
        await taskGroup.destroy();
        return new MutationResult(EActionStatus.success);
    }
}