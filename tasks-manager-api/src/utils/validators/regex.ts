import { Validator } from "@bases/property-validator";
import { ValidatorType } from "@enums/validator.enum";

export class RegexValidator extends Validator {
    constructor(regex: RegExp) {
        super(ValidatorType.regex);
        this.options = { regex };
        if (!this.options.regex) 
            throw new Error('Require regex for validator');
    }

    public validate(value: any): boolean {
        if (!value) return false;
        return this.options.regex.test(value);
    }

    public serialize(): any {
        return {
            regex: this.options.regex.toString()
        };
    }
}