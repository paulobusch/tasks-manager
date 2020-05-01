import settings from '@settings';
import jwt from "jsonwebtoken";
import { promisify } from 'bluebird';
import { Converter } from '@metadata/converter';
import { TokenData } from '@models/login/models/token-data';
import { MutationResult } from '@results/action-result';
import { EActionStatus } from '@enums/action-status.enum';

export default async (req, res, next) => {
    const url = req.url.substr(req.url.indexOf('/') + 1);
    const byAuth = !settings["free-auth"].some(a => url.indexOf(a) !== -1);
    if(!byAuth) return next();
    const authorization = req.headers["authorization"];
    if(!authorization) {
        const result = new MutationResult(EActionStatus.unauthorized, 'Require authorization header');
        return res.status(401).send(result.serialize());
    }
    const [,token] = authorization.split(' ');
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET as string);
        req.data = Converter.assign(new TokenData(), decoded);
        return next();
    }catch(err) {
        const result = new MutationResult(EActionStatus.unauthorized, 'Invalid token header');
        return res.status(401).send(result.serialize());
    }
};