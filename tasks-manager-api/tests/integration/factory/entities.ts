import faker from 'faker';
import { User } from '@models/users/entities/user';
import { NewId } from '@metadata/random';
import { Converter } from '@metadata/converter';
import { TaskGroup } from '@models/tasks/entities/task-group';
import { DatabaseTests } from '../database-tests';

export class FactoryEntity {
    public static newUser(id?: string): User {
        const user = new User({
            id: id || NewId(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            login: faker.name.firstName(),
            password: faker.random.alphaNumeric(10)
        });

        return user;
    }

    public static newTaskGroup(id?: string): TaskGroup {
        const taskGroup = new TaskGroup({
            id: id || NewId(),
            name: `Group: ${NewId()}`,
            id_user_created: DatabaseTests.user.id,
            id_user_updated: DatabaseTests.user.id
        });

        return taskGroup;
    }
}