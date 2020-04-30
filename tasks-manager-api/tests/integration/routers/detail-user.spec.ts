import { DatabaseTests } from "../database-tests";
import { FactoryEntity } from "../factory/entities";
import { Request } from "../test-fixture";
import { UserDetail } from "@models/users/view-models/user-detail";
import { NewId } from "@metadata/random";

describe('Users', () => {
    beforeAll(DatabaseTests.init);

    test('detail', async(done) => {
        const user = FactoryEntity.newUser();
        await user.save();
        const { status, body } = await Request.get(`/users/${user.id}`);
        expect(status).toEqual(200);
        expect(body.data).not.toBeNull();
        const userDetail = body.data as UserDetail;
        expect(userDetail.id).toEqual(user.id);
        expect(userDetail.name).toEqual(user.name);
        expect(userDetail.email).toEqual(user.email);
        expect(userDetail.login).toEqual(user.login);
        done();
    });

    test('detail none', async() => {
        const { status } = await Request.get(`/users/${NewId()}`);
        expect(status).toEqual(404);
    });
})