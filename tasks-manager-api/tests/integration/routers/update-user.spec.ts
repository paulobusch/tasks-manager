import { DatabaseTests } from "../database-tests";
import { FactoryEntity } from "../factory/entities";
import { Request } from "../test-fixture";
import { User } from "@models/users/entities/user";

describe('Users', () => {
    beforeAll(DatabaseTests.init);
    
    test('update', async (done) => {
        const userDb = FactoryEntity.newUser();
        await userDb.save();
        const userUpdate = FactoryEntity.newUser(userDb.id);
        const { status } = await Request.put(`/users/${userUpdate.id}`).send(userUpdate.get());
        expect(status).toEqual(200);
        const userUpdateDb = await User.findOne({ where: { id: userUpdate.id } });
        const userUpdateDbValue = userUpdateDb || new User();
        expect(userUpdateDbValue.name).toEqual(userUpdate.name);
        expect(userUpdateDbValue.email).toEqual(userUpdate.email);
        expect(userUpdateDbValue.login).toEqual(userUpdate.login); 
        done();
    });

    test('update consistent', async(done) => {
        const userDb = FactoryEntity.newUser();
        await userDb.save();
        const userExistsName = FactoryEntity.newUser();
        userExistsName.name = userDb.name;
        var { status, body } = await Request.put(`/users/${userDb.id}`).send(userExistsName.get());
        expect(status).toEqual(409);
        expect(body.message).toEqual('User with name already exists');
    
        const userExistsEmail = FactoryEntity.newUser();
        userExistsEmail.email = userDb.email;
        var { status, body } = await Request.put(`/users/${userDb.id}`).send(userExistsEmail.get());
        expect(status).toEqual(409);
        expect(body.message).toEqual('User with email already exists');

        const userExistsLogin = FactoryEntity.newUser();
        userExistsLogin.login = userDb.login;
        var { status, body } = await Request.put(`/users/${userDb.id}`).send(userExistsLogin.get());
        expect(status).toEqual(409);
        expect(body.message).toEqual('User with login already exists');
        done();
    });
});