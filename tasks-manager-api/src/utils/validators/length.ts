import { Validator } from "@bases/property-validator";
import { Shape } from "../metadata/shape-type";
import { ValidatorType } from "@enums/validator.enum";

export class LengthOptions {
    public length?: number;
    public min?: number;
    public max?: number;

    constructor(data: Shape<LengthOptions>) {
        Object.assign(this, data);
    }
}

export class LengthValidator extends Validator {
    constructor(options: LengthOptions) {
        super(ValidatorType.length);
        this.options = options;
        if (!this.options || (!this.options.length && !this.options.min && !this.options.max)) 
            throw new Error('Require configure length options');
    }

    public validate(value: any): boolean {
        const { length, min, max } = this.options;
        if (!value) return false;
        if (length && value.length !== length) return false;
        if (min && value.length < min) return false;
        if (max && value.length > max) return false;
        return true;
    }
}