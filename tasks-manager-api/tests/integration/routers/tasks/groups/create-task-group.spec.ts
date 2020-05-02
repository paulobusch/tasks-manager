import { DatabaseTests } from "@tests/integration/database-tests";
import { Headers, Request, NewId } from "@tests/integration/test-fixture";
import { FactoryEntity } from "@tests/integration/factory/entities";
import { TaskGroup } from "@models/tasks/entities/task-group";
import { User } from "@models/users/entities/user";

describe('TaskGroup', () => {
    let headers: { [key: string]: string };
    let user: User;
    beforeAll(async() => {
        await DatabaseTests.init();
        user = DatabaseTests.user;
        headers = await Headers();
    });

    test('create', async (done) => {
        const taskGroup = FactoryEntity.newTaskGroup();
        const { status } = await Request.post(`/tasks/${NewId()}/groups`).set(headers).send(taskGroup.get());
        expect(status).toEqual(200);
        const query = { where: { id: taskGroup.id } };
        const taskGroupDb = await TaskGroup.findOne(query);
        expect(taskGroupDb).not.toBeNull();
        const taskGroupValue = taskGroupDb || new TaskGroup();
        expect(taskGroupValue.id).toEqual(taskGroup.id);
        expect(taskGroupValue.name).toEqual(taskGroup.name);
        expect(taskGroupValue.id_user_created).toEqual(user.id);
        expect(taskGroupValue.id_user_updated).toEqual(user.id);
        done();
    });

    test('create fail', async(done) => {
        const taskGroup = FactoryEntity.newTaskGroup();
        await taskGroup.save();
        const { status, body } = await Request.post(`/tasks/${NewId()}/groups`).set(headers).send(taskGroup.get());
        expect(status).toEqual(409);
        expect(body.message).toEqual('Task group with name already exists');
        done();
    })
});