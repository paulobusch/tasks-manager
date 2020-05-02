import { FactoryEntity } from "@tests/integration/factory/entities";
import { User } from "@models/users/entities/user";
import { DatabaseTests } from "@tests/integration/database-tests";
import { Headers, Request, NewId } from "@tests/integration/test-fixture";
import { TaskGroup } from "@models/tasks/entities/task-group";

describe('TaskGroup', () => {
    let headers: { [key: string]: string };
    let user: User;
    beforeAll(async() => {
        await DatabaseTests.init();
        user = DatabaseTests.user;
        headers = await Headers();
    });
    
    test('update', async(done) => {
        const taskGroup = FactoryEntity.newTaskGroup();
        await taskGroup.save();
        const taskGroupUpdate = FactoryEntity.newTaskGroup(taskGroup.id);
        const { status } = await Request.put(`/tasks/${NewId()}/groups/${taskGroupUpdate.id}`).set(headers).send(taskGroupUpdate.get());
        expect(status).toEqual(200);
        const query = { where: { id: taskGroupUpdate.id } };
        const taskGroupDb = await TaskGroup.findOne(query);
        expect(taskGroupDb).not.toBeNull();     
        const taskGroupValue = taskGroupDb || new TaskGroup();
        expect(taskGroupValue.id).toEqual(taskGroupUpdate.id);     
        expect(taskGroupValue.name).toEqual(taskGroupUpdate.name);     
        expect(taskGroupValue.id_user_updated).toEqual(user.id);     
        done();
    });

    test('update fail', async(done) => {
        const taskGroup = FactoryEntity.newTaskGroup();
        await taskGroup.save();
        const taskGroupUpdate = FactoryEntity.newTaskGroup();
        taskGroupUpdate.set({ name: taskGroup.name });
        const { status, body } = await Request.put(`/tasks/${NewId()}/groups/${taskGroupUpdate.id}`).set(headers).send(taskGroupUpdate.get());
        expect(status).toEqual(409);
        expect(body.message).toEqual('Task group with name already exists');
        done();
    })
});