import express from 'express';
import cors from 'cors';
import settings from '@settings';
import auth from './filters/auth';
import ActionHandler from '@handlers/action-handler';
import { Db } from './database';
import { RestTree } from 'rest-tree-directorty';
import { UrlParser } from '@routers/extract-params';
import { ActionContext } from '@metadata/action-context';

class Application {
    public express: express.Express;

    constructor() {
        this.express = express();
        this.middlares();
        this.routers();
    }

    middlares() {
        this.express.use(express.json()) 
        this.express.use(cors());
    }

    routers() {
        RestTree.setConfig(settings.rest);
        for (let router of RestTree.getRouters(__dirname)) {
            this.express[router.method](router.path, auth, async (request, response) => {
                if (!router.module || !Object.keys(router.module).length) 
                    throw new Error('Require implements class');
                const className = Object.keys(router.module)[0];
                let action = new router.module[className]();
                Object.assign(action, UrlParser.getQueryParams(request.url));
                Object.assign(action, UrlParser.getDataParams(request.url, router.path));
                Object.assign(action, request.body);
                const context = new ActionContext({ data: request.data, request, response, db: Db });
                const result = await ActionHandler.run(action, context);
                response.status(result.status);
                response.json(result.serialize());
            });
        }
        
        this.express.get('/', (req, res) => {
            res.send(RestTree.compile(__dirname));
        });        
    }
}

export default new Application();