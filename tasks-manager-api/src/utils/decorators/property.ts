import { PropertyData } from "@metadata/property";
import { Validator } from "@bases/property-validator";

const actionsData: { [action: string]: { [propery: string]: PropertyData } } = { };

export function Property(validators: Validator[]) {
    return function (action: any, propertyKey: string) {
        const actionName = action.constructor.name;
        actionsData[actionName] = actionsData[actionName] || [];
        actionsData[actionName][propertyKey] = new PropertyData({ validators });
    }
}

export class DecoratorProperty {
    static getPropertyData(action: any, propertyKey: string): PropertyData {
        const actionName = action.constructor.name;
        if (!actionsData[actionName]) return { } as PropertyData;
        return actionsData[actionName][propertyKey];
    }
    
    static getProperties(action: any): string[] {
        const actionName = action.constructor.name;
        if (!actionsData[actionName]) return [];
        return Object.keys(actionsData[actionName]);
    }
}