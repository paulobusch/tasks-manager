import 'module-alias/register';
import dotenv from 'dotenv'; dotenv.config({ path: '.env.test' });
import { Db, RunTransaction } from '@database';
import { NewId } from '@metadata/random';

export class DatabaseTests {
    public static async init() {
        await Db.sync({ force: true });
    }
}