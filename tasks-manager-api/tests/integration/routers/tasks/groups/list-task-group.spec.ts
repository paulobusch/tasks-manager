import { DatabaseTests } from "@tests/integration/database-tests";
import { Headers, Request, NewId } from "@tests/integration/test-fixture";
import { FactoryEntity } from "@tests/integration/factory/entities";
import { TaskGroup } from "@models/tasks/entities/task-group";
import { User } from "@models/users/entities/user";
import { QueryResult } from "@results/action-result";
import { TaskGroupList } from "@models/tasks/view-models/task-group-list";

describe('TaskGroup', () => {
    let headers: { [key: string]: string };
    let user: User;
    beforeAll(async() => {
        await DatabaseTests.init();
        user = DatabaseTests.user;
        headers = await Headers();
    });

    test('list', async (done) => {
        const taskGroup = FactoryEntity.newTaskGroup();
        await taskGroup.save();
        const { status, body } = await Request.get(`/tasks/${NewId()}/groups`).set(headers);
        expect(status).toEqual(200);
        const taskGroupList = body as QueryResult<TaskGroupList[]>;
        const taskGroupFinded = taskGroupList.data.find(f => f.id == taskGroup.id);
        expect(taskGroupFinded).not.toBeNull();
        const taskGroupValue = taskGroupFinded || new TaskGroupList();
        expect(taskGroupValue.id).toEqual(taskGroup.id);
        expect(taskGroupValue.name).toEqual(taskGroup.name);
        done();
    });
});