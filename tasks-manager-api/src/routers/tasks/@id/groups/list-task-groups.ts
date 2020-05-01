import { Query } from "@bases/action-bases";
import { ActionContext } from "@metadata/action-context";
import { QueryResult } from "@results/action-result";
import { DecoratorAttribute } from "@decorators/attribute";
import { TaskGroup } from "@models/tasks/entities/task-group";
import { TaskGroupList } from "@models/tasks/view-models/task-group-list";

export class ListTaskGroups extends Query<TaskGroupList[]> {
    async execute(context: ActionContext): Promise<QueryResult<TaskGroupList[]>> {
        const attributes = DecoratorAttribute.getAttributes(TaskGroupList);
        const query = { attributes };
        const taskGroups = await TaskGroup.findAll(query);
        return new QueryResult(taskGroups.map(t => TaskGroupList.map(t)));
    }
}