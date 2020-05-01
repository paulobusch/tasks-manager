import dotenv from 'dotenv'; dotenv.config({ path: '.env.test' });
import Application from '../../src/application';
import supertest from 'supertest';
import { NewId } from "../../src/utils/metadata/random";
import { DatabaseTests } from './database-tests';
import { FactoryEntity } from './factory/entities';
import { Bcrypt } from '@hashing/bcrypt';
import { User } from '@models/users/entities/user';
import { TokenData } from '@models/login/models/token-data';

const App = Application.express;
const Request = supertest(App);

const Headers = async () => {
    const user = DatabaseTests.user;
    const token = new TokenData({ id: user.id, name: user.name });
    return { 'authorization': 'Bearer ' + token.newToken() };
}

export {
    NewId, App, Request, Headers
};