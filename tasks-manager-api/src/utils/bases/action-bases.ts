import { IAction } from "@interfaces/action.interface";
import { QueryPaginated } from "@results/action-paginated";
import { ETrigger } from "@enums/trigger.enum";
import { MutationResult, QueryResult } from "@results/action-result";
import { ActionContext } from "../metadata/action-context";
import { IViewModel } from "@interfaces/action-view-model.interface";

export abstract class Mutation implements IAction<any> {
    async abstract consistent(): Promise<MutationResult>;
    permitted(): boolean { return true; }
    async abstract execute(context: ActionContext): Promise<MutationResult>;
    triggers(): ETrigger[] { return []; }
}

export abstract class Query<TResult extends IViewModel | QueryPaginated<TResult>> implements IAction<TResult> {
    async consistent(): Promise<QueryResult<TResult>> { return new QueryResult({ } as TResult); }
    permitted(): boolean { return true; }
    async abstract execute(context: ActionContext): Promise<QueryResult<TResult>>;
    triggers(): ETrigger[] { return []; }
}