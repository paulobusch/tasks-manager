import { EActionStatus } from "@enums/action-status.enum";

export interface IActionResult<TResult> {
    status: EActionStatus,
    message?: string,
    data?: TResult,

    serialize(): any;
}