import { IViewModel } from "@interfaces/action-view-model.interface";

export class QueryPaginated<TRestul extends IViewModel> {
    constructor(
        public total: number,
        public rows: TRestul[]
    ) { }
}