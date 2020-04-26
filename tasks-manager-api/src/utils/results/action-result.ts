import { IActionResult } from '@interfaces/action-result.interface';
import { EActionStatus } from '@enums/action-status.enum';
import { QueryPaginated } from './action-paginated';
import { IViewModel } from '@interfaces/action-view-model.interface';

export class ActionResult implements IActionResult<any> {
    constructor(
        public status = EActionStatus.success,
        public message?: string,
        public data?: any 
    ) { }

    serialize(): any {
        return {
            message: this.message,
            data: this.data
        };
    }
}

export class MutationResult implements IActionResult<any> {
    constructor(
        public status = EActionStatus.success,
        public message?: string,
        public data?: any 
    ) { }
    
    serialize(): any {
        return {
            message: this.message,
            data: this.data
        };
    }
}

export class QueryResult<TResult extends IViewModel | QueryPaginated<IViewModel>> implements IActionResult<TResult>  {
    constructor(
        public data: TResult, 
        public status = EActionStatus.success,
        public message?: string,
    ) { }
    
    serialize(): any {
        return {
            message: this.message,
            data: this.data
        };
    }
}
