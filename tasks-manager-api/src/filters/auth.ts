import settings from '@settings';

export default function async (req, res, next) {
    const url = req.url.substr(req.url.indexOf('/') + 1);
    const byAuth = !settings["free-auth"].some(a => url.indexOf(a) !== -1);
    if(!byAuth) return next();
    return next();
};