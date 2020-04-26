import { UserList } from "@models/users/view-models/user-list";
import { QueryPaginated } from "@results/action-paginated";
import { Query } from "@bases/action-bases";
import { ActionContext } from "@metadata/action-context";
import { QueryResult } from "@results/action-result";
import { DecoratorAttribute } from "@decorators/attribute";
import { Op } from "sequelize";
import { User } from "@models/users/entities/user";

export class ListUsers extends Query<QueryPaginated<UserList>> {
    public page: number = 0;
    public limit: number = 10;
    public search: string;

    async execute(context: ActionContext): Promise<QueryResult<QueryPaginated<UserList>>> {
        const attributes = DecoratorAttribute.getAttributes(UserList);
        const query = {
            attributes,
            where: { [Op.and]: [] },
            offset: this.limit * this.page,
            limit: this.limit
        } as any; 

        if (this.search) {
            const searchLike = `${this.search}%`;
            query.where[Op.and].push({
                [Op.or]: [
                    { name: { [Op.like]: searchLike } },
                    { login: { [Op.like]: searchLike } },
                    { email: { [Op.like]: searchLike } },
                ]
            });
        }

        const result = await User.findAndCountAll(query);
        const users = result.rows.map(u => UserList.map(u));
        return new QueryResult(new QueryPaginated<UserList>(result.count, users));
    }
}