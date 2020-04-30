import { DatabaseTests } from "../database-tests";
import { FactoryEntity } from "../factory/entities";
import { Request } from "../test-fixture";
import { UserList } from "@models/users/view-models/user-list";
import { QueryPaginated } from "@results/action-paginated";

describe('Users', () => {
    beforeAll(DatabaseTests.init); 
    
    test('list', async(done) => {
        const user = FactoryEntity.newUser();
        await user.save();
        const query = `search=${user.name}`;
        const { status, body } = await Request.get(`/users?${query}`);
        expect(status).toEqual(200);
        expect(body.data).not.toBeNull();
        const usersList = body.data as QueryPaginated<UserList>;
        const userItem = usersList.rows[0];
        expect(usersList.total).toEqual(1);
        expect(userItem.id).toEqual(user.id);
        expect(userItem.name).toEqual(user.name);
        expect(userItem.email).toEqual(user.email);
        
        done();
    })
});