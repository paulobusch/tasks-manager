import { IAction } from "@interfaces/action.interface";
import { ActionResult } from "@results/action-result";
import { EActionStatus } from "@enums/action-status.enum";
import { DecoratorProperty } from "@decorators/property";
import { ValidatorType } from "@enums/validator.enum";

export class ValidatorHandler {
    static validate<TResult>(action: IAction<TResult>): ActionResult {
        for (let propertyKey of DecoratorProperty.getProperties(action)) {
            const value = action[propertyKey];
            const properyData = DecoratorProperty.getPropertyData(action, propertyKey);
            for (let validator of properyData.validators) {
                const valid = validator.validate(value);
                if (!valid){
                    const data = { 
                        field: propertyKey,
                        validator: ValidatorType[validator.type],
                        options: validator.serialize()
                    };
                    return new ActionResult(EActionStatus.notAllowed, 'Current action is not valid', data);
                }
            }
        }
        return new ActionResult(EActionStatus.success);
    }
}