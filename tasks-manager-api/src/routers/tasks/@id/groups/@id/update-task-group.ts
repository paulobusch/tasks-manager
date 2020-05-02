import { Mutation } from "@bases/action-bases";
import { ActionContext } from "@metadata/action-context";
import { MutationResult, ActionResult } from "@results/action-result";
import { Property } from "@decorators/property";
import { Validators } from "@metadata/validators";
import { Op } from "sequelize";
import { EActionStatus } from "@enums/action-status.enum";
import { TaskGroup } from "@models/tasks/entities/task-group";

export class UpdateTaskGroup extends Mutation {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;
    
    @Property([Validators.required, Validators.lenght({ max: 200 })])
    public name: string;

    async consistent(): Promise<MutationResult> {
        const existsName = await TaskGroup.findOne({ where: { name: this.name, id: { [Op.not]: this.id } } });
        if (existsName) return new MutationResult(EActionStatus.conflict, 'Task group with name already exists');
        return new MutationResult(EActionStatus.success);
    }
    async execute(context: ActionContext): Promise<MutationResult> {
        const query = { where: { id: this.id } };
        const taskGroup = await TaskGroup.findOne(query);
        if (!taskGroup) return new MutationResult(EActionStatus.notFound);
        taskGroup.set({ 
            name: this.name,
            id_user_updated: context.data.id
        });
        const result = await taskGroup.save();
        if (!result) return new MutationResult(EActionStatus.error);
        return new MutationResult(EActionStatus.success);
    }
}