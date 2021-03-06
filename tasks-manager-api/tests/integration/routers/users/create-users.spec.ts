import 'module-alias/register';
import { FactoryEntity } from '@tests/integration/factory/entities';
import { DatabaseTests } from '@tests/integration/database-tests';
import { Request, Headers } from '../../test-fixture';
import { User } from '@models/users/entities/user';

describe('Users', () => {
    let headers: { [key: string]: string };
    beforeAll(async() => {
        await DatabaseTests.init();
        headers = await Headers();
    });

    test('create', async (done) => {
        const user = FactoryEntity.newUser();
        const { status, body } = await Request.post('/users').set(headers).send(user.get());
        expect(status).toEqual(200);
        expect(status).not.toBeNull();
        const userDb = await User.findOne({ where: { id: user.id } });
        const userDbValue = userDb || new User();
        expect(userDb).not.toBeNull();
        expect(userDbValue.name).toEqual(user.name);
        expect(userDbValue.email).toEqual(user.email);
        expect(userDbValue.login).toEqual(user.login);
        done();
    });
    
    test('create consistent', async(done) => {
        const userDb = FactoryEntity.newUser();
        await userDb.save();
        const userExistsName = FactoryEntity.newUser();
        userExistsName.name = userDb.name;
        var { status, body } = await Request.post('/users').set(headers).send(userExistsName.get());
        expect(status).toEqual(409);
        expect(body.message).toEqual('User with name already exists');
    
        const userExistsEmail = FactoryEntity.newUser();
        userExistsEmail.email = userDb.email;
        var { status, body } = await Request.post('/users').set(headers).send(userExistsEmail.get());
        expect(status).toEqual(409);
        expect(body.message).toEqual('User with email already exists');

        const userExistsLogin = FactoryEntity.newUser();
        userExistsLogin.login = userDb.login;
        var { status, body } = await Request.post('/users').set(headers).send(userExistsLogin.get());
        expect(status).toEqual(409);
        expect(body.message).toEqual('User with login already exists');
        done();
    });
});