import dotenv from 'dotenv'; dotenv.config({ path: '.env.test' });
import { Db } from '../../src/database';

export class DatabaseTests {
    public static async init() {
        await Db.sync({ force: true });
    }
}