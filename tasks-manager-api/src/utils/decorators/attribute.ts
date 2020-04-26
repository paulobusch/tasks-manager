const modelsData: { [model: string]: string[] } = { };

const Attribute = function(name?: string): Function { 
    return function(viewModel: any, propertyKey: string) { 
        const modelName = viewModel.constructor.name;
        modelsData[modelName] = modelsData[modelName] || [];
        modelsData[modelName].push(name || propertyKey);
    }
}

export class DecoratorAttribute {
    static getAttributes(type: any): string[] {
        const modelName = type.prototype 
            ? type.prototype.constructor.name 
            : type.constructor.name;
        return modelsData[modelName];
    }
}

export { Attribute };