import { Shape } from "@metadata/shape-type";
import { Validator } from "@bases/property-validator";

export class PropertyData {
    public validators: Validator[] = [];
 
    constructor(data: Shape<PropertyData>) {
        Object.assign(this, data);
    }
 }