export class UrlParser {
    public static getDataParams(url: string, urlBase: string): any {
        if (!url || !urlBase) return new Object();
        const params = urlBase.split('/');
        const values = url.split('/');
        const result = new Object();
        for (let key in params) {
            if (params[key].indexOf(':') !== 0) continue;
            result[params[key].substr(1)] = UrlParser.tryCast(values[key]);
        }
        return result;
    }

    public static getQueryParams(url: string): any {
        if (!url || url.indexOf('?') === -1) return new Object();
        const params = url.substr(url.indexOf('?') + 1);
        const values = params.split('&');
        const result = new Object();
        for (let value of values) {
            const index = value.indexOf('=');
            const key = value.substr(0, index);
            const val = value.substr(index + 1);
            result[key] = UrlParser.tryCast(val);
        }
        return result;
    }

    private static tryCast(value: any): any {
        if (!value) return;
        if (!isNaN(parseInt(value))) return parseInt(value);
        if (['false', 'true'].indexOf(value) !== -1) return value === 'true';
        if (new Date(value).toString() !== 'Invalid Date') return new Date(value);
        return value.toString();
    }
}