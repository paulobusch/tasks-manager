import { FactoryEntity } from "@tests/integration/factory/entities";
import { Request, Headers } from "../../test-fixture";
import { AuthResult } from "@models/login/view-models/auth-result";
import { DatabaseTests } from "@tests/integration/database-tests";

describe('Auth', () => {
    let headers: { [key: string]: string };
    beforeAll(async() => {
        await DatabaseTests.init();
        headers = await Headers();
    });
    
    test('login done', async (done) => {
        const user = FactoryEntity.newUser();
        await Request.post('/users').set(headers).send(user.get());
        const content = { login: user.login, password: user.password };
        const { status, body } = await Request.post('/login').send(content);
        expect(status).toEqual(200);
        const result = body.data as AuthResult;
        expect(result.tokenStr).not.toBeNull();
        expect(result.tokenData).not.toBeNull();
        expect(result.tokenData.id).toEqual(user.id);
        expect(result.tokenData.name).toEqual(user.name);
        done();
    });

    test('login fail', async (done) => {
        const user = FactoryEntity.newUser();
        const content = { login: user.login, password: user.password };
        const { status } = await Request.post('/login').send(content);
        expect(status).toEqual(401);
        done();
    });
});