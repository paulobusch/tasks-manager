import { DecoratorAttribute } from "@decorators/attribute";

export class Converter {
    static assign<T extends Object>(ins: T, obj: any): T {
        if (!ins || !obj) return ins;
        for (let prop in ins){
            if (obj.hasOwnProperty(prop))
                ins[prop] = obj[prop];
        }
        const attributes = DecoratorAttribute.getAttributes(ins);
        for (let attr of attributes) {
            if (obj.hasOwnProperty(attr))
                ins[attr] = obj[attr];
        }
        return ins;
    } 
}