import { Validator } from "@bases/property-validator";
import { ValidatorType } from "@enums/validator.enum";

export class RequiredValidator extends Validator {
    constructor() {
        super(ValidatorType.required);
    }

    public validate(value: any): boolean {
        return value !== null && value != undefined;
    }
}