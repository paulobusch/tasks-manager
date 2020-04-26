import { Shape } from "@metadata/shape-type";
import { LengthOptions, LengthValidator } from "@validators/length";
import { Validator } from "@bases/property-validator";
import { RequiredValidator } from "@validators/required";
import { EmailValidator } from "@validators/email";
import { RegexValidator } from "@validators/regex";
import { RangeOptions, RangeValidator } from "@validators/range";

export class Validators {

    static get required(): Validator {
        return new RequiredValidator();
    }

    static get email(): Validator {
        return new EmailValidator();
    }

    static lenght(options: Shape<LengthOptions>): Validator {
        return new LengthValidator(options);
    }

    static range(options: Shape<RangeOptions>): Validator {
        return new RangeValidator(options);
    }

    static regex(regex: RegExp): Validator {
        return new RegexValidator(regex);
    }
}