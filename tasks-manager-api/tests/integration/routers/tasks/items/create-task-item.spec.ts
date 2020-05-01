import { DatabaseTests } from "@tests/integration/database-tests";
import { Headers } from "@tests/integration/test-fixture";
import { FactoryEntity } from "@tests/integration/factory/entities";

describe('TaskGroup', () => {
    let headers: { [key: string]: string };
    beforeAll(async() => {
        await DatabaseTests.init();
        headers = await Headers();
    });

    test('create', async (done) => {
        const TaskGroup = FactoryEntity.newTaskGroup();
    });
});