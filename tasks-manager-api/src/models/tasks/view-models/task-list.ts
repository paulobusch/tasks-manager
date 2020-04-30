import { IViewModel } from "@interfaces/action-view-model.interface";
import { Attribute } from "@decorators/attribute";
import { Task } from "../entities/task";
import { Converter } from "@metadata/converter";

export class TaskList implements IViewModel {
    @Attribute() public id: string;
    @Attribute() public name: string;
    @Attribute() public start_time: Date;

    public static map(model: Task): TaskList {
        const task = model.get();
        return Converter.assign(new TaskList(), task);
    }
}