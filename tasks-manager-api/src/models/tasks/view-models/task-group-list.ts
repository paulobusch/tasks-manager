import { IViewModel } from "@interfaces/action-view-model.interface";
import { Attribute } from "@decorators/attribute";
import { Converter } from "@metadata/converter";
import { TaskGroup } from "../entities/task-group";

export class TaskGroupList implements IViewModel {
    @Attribute() public id: string;
    @Attribute() public name: string;

    public static map(model: TaskGroup): TaskGroupList {
        const taskGroup = model.get();
        return Converter.assign(new TaskGroupList(), taskGroup);
    }
}