import { Validator } from "@bases/property-validator";
import { Shape } from "../metadata/shape-type";
import { ValidatorType } from "@enums/validator.enum";

export class RangeOptions {
    public min?: number;
    public max?: number;

    constructor(data: Shape<RangeOptions>) {
        Object.assign(this, data);
    }
}

export class RangeValidator extends Validator {
    constructor(options: RangeOptions) {
        super(ValidatorType.range);
        this.options = options;
        if (!this.options || (typeof this.options.min !== 'number' && typeof this.options.max !== 'number')) 
            throw new Error('Require configure length options');
    }

    public validate(value: any): boolean {
        if (typeof value !== 'number') throw new Error('Value is not number');
        const { min, max } = this.options;
        if (min && value < min) return false;
        if (max && value > max) return false;
        return true;
    }
}