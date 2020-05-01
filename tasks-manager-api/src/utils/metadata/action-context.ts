import express from 'express';
import { Shape } from './shape-type';
import { Sequelize, Transaction } from 'sequelize/types';
import { MutationResult, ActionResult } from '@results/action-result';
import { EActionStatus } from '@enums/action-status.enum';
import { TokenData } from '@models/login/models/token-data';

export class ActionContext {
    public db: Sequelize;
    public data: TokenData;
    public request: express.Request;    
    public response: express.Response;

    constructor(data: any) {
        Object.assign(this, data);
    }
}