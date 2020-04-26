import { ETrigger } from "@enums/trigger.enum";
import { IAction } from "@interfaces/action.interface";
import { IActionResult } from "./action-result.interface";

export interface ITrigger {
    trigger(): ETrigger;
    execute<TResult>(action: IAction<TResult>, result: IActionResult<TResult>);   
}