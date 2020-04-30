import { IViewModel } from "@interfaces/action-view-model.interface";
import { Attribute } from "@decorators/attribute";
import { TaskItem } from "../entities/task-item";
import { Converter } from "@metadata/converter";

export class TaskItemList implements IViewModel {
    @Attribute() public id: string;
    @Attribute() public name: string;

    public static map(model: TaskItem): TaskItemList {
        const taskItem = model.get();
        return Converter.assign(new TaskItemList(), taskItem);
    }
}