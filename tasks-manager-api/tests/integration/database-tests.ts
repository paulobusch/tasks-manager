import dotenv from 'dotenv'; dotenv.config({ path: '.env.test' });
import { Db } from '../../src/database';
import { FactoryEntity } from './factory/entities';
import { Bcrypt } from '@hashing/bcrypt';
import { User } from '@models/users/entities/user';

export class DatabaseTests {
    public static user: User;

    public static async init() {
        await Db.sync({ force: true });
        await DatabaseTests.defaultUser();
    }

    private static async defaultUser() {
        DatabaseTests.user = FactoryEntity.newUser();
        await DatabaseTests.user.save();
        const query = { where: { id: DatabaseTests.user.id } };
        const setHash = { password: await Bcrypt.encript(DatabaseTests.user.password) };
        await User.update(setHash, query);
    }
}