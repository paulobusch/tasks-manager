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

    test('delete', async (done) => {
        const taskGroup = FactoryEntity.newTaskGroup();
        await taskGroup.save();
        const { status } = await Request.delete(`/tasks/${NewId()}/groups/${taskGroup.id}`).set(headers);
        expect(status).toEqual(200);
        const query = { where: { id: taskGroup.id } };
        const taskGroupDb = await TaskGroup.findOne(query);
        expect(taskGroupDb).toBeNull();
        done();
    });

    test('delete fail', async(done) => {
        const { status } = await Request.delete(`/tasks/${NewId()}/groups/${NewId()}`).set(headers);
        expect(status).toEqual(404);
        done();
    });
});