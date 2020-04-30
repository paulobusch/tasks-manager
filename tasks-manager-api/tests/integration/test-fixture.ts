import dotenv from 'dotenv'; dotenv.config({ path: '.env.test' });
import Application from '../../src/application';
import supertest from 'supertest';
import { NewId } from "../../src/utils/metadata/random";

const App = Application.express;
const Request = supertest(App);

export {
    NewId, App, Request
};