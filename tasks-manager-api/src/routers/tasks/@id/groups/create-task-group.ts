import { Mutation } from "@bases/action-bases";
import { MutationResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { EActionStatus } from "@enums/action-status.enum";
import { TaskGroup } from "@models/tasks/entities/task-group";

export class CreateTaskGroup extends Mutation {
    @Property([Validators.required, Validators.lenght({ length: 8 })])
    public id: string;

    @Property([Validators.required, Validators.lenght({ max: 200 })])
    public name: string;

    async consistent(): Promise<MutationResult> {
        const existsName = await TaskGroup.findOne({ where: { name: this.name } });
        if (existsName) return new MutationResult(EActionStatus.conflict, 'Task group with name already exists');
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const taskGroup = new TaskGroup({
            id: this.id,
            name: this.name,
            id_user_created: context.data.id,
            id_user_updated: context.data.id
        });
        const result = await taskGroup.save();
        if (!result) return new MutationResult(EActionStatus.error);
        return new MutationResult(EActionStatus.success);
    }
}