import faker from 'faker';
import { User } from '@models/users/entities/user';
import { NewId } from '@metadata/random';
import { Converter } from '@metadata/converter';

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
}