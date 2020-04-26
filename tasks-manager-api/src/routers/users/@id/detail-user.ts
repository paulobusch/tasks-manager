import { UserDetail } from "@models/users/view-models/user-detail";
import { Query } from "@bases/action-bases";
import { Validators } from "@metadata/validators";
import { QueryResult, MutationResult } from "@results/action-result";
import { ActionContext } from "@metadata/action-context";
import { Property } from "@decorators/property";
import { User } from "@models/users/entities/user";
import { EActionStatus } from "@enums/action-status.enum";
import { DecoratorAttribute } from "@decorators/attribute";

export class DetailUser extends Query<UserDetail> {
    @Property([Validators.lenght({ length: 8 })])
    public id: string;

    async execute(context: ActionContext): Promise<QueryResult<UserDetail>> {
        const attributes = DecoratorAttribute.getAttributes(UserDetail);
        const query = { 
            attributes,
            where: { id: this.id } 
        };
        const user = await User.findOne(query);
        if (!user) return new QueryResult({ } as any, EActionStatus.notFound, 'User with id does not exists');
        return new QueryResult(UserDetail.map(user)); 
    }
}