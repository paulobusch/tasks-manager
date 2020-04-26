import { ETrigger } from "@enums/trigger.enum";
import { IActionResult } from "@interfaces/action-result.interface";
import { ActionContext } from "@metadata/action-context";

export interface IAction<TResult> {
    consistent(): Promise<IActionResult<TResult>>;
    permitted(): boolean;
    execute(context: ActionContext): Promise<IActionResult<TResult>>;
    triggers(): ETrigger[]
}