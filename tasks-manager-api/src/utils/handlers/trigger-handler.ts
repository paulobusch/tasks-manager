import { ITrigger } from "@interfaces/trigger.interface";
import { ETrigger } from "@enums/trigger.enum";
import { IAction } from "@interfaces/action.interface";
import { ActionResult } from "@results/action-result";
import { EActionStatus } from "@enums/action-status.enum";

export class TriggerHandler {
    private static triggers: ITrigger[];

    public static getTriggers(triggers: ETrigger[]): ITrigger[] {
        return this.triggers.filter(t => triggers.indexOf(t.trigger()) !== -1);
    }

    public static async runTriggers<TResult>(action: IAction<TResult>, result: ActionResult) {
        if (!action || !action.triggers().length) return;
        for (let trigger of TriggerHandler.getTriggers(action.triggers())) {
            try {
                await trigger.execute(action, result);
            }catch(err) {
                return new ActionResult(EActionStatus.error, `Error on run trigger: ${ETrigger[trigger.trigger()]}`);
            }
        }
    }
}