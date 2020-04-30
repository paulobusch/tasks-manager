import { DatabaseTests } from "../database-tests";
import { FactoryEntity } from "../factory/entities";
import { Request } from "../test-fixture";
import { User } from "@models/users/entities/user";

describe('Users', () => {
    beforeAll(DatabaseTests.init);

    test('delete', async(done) => {
        const userDb = await FactoryEntity.newUser();
        await userDb.save();
        const { status } = await Request.delete(`/users/${userDb.id}`);
        expect(status).toEqual(200);
        const exists = !!await User.count({ where: { id: userDb.id } });
        expect(exists).toEqual(false);
        done();
    });
}); 