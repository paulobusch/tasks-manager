import 'module-alias/register';
import dotenv from 'dotenv'; dotenv.config({ path: '.env.test' });
import Application from '../src/application';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { NewId } from "../src/utils/metadata/random";

chai.use(chaiHttp);
const Assert = chai.assert;
const Request = chai.request;
const App = Application.express;

export {
    NewId, App,
    Assert, Request
};