import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { ActionResult } from '@results/action-result';
import { EActionStatus } from '@enums/action-status.enum';
import { User } from '@models/users/entities/user';
import { TaskItem } from '@models/tasks/entities/task-item';
import { Task } from '@models/tasks/entities/task';

const Db = new Sequelize({
        logging: false,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        dialect: 'mysql',
        models: [User, Task, TaskItem]
});

const RunTransaction = async (call: (transaction: Transaction) => {}): Promise<ActionResult> => {
    let transaction = await Db.transaction({ autocommit: false });
    try {
        await call(transaction);
        await transaction.commit();
        return new ActionResult(EActionStatus.success);
    }catch(err) {
        console.log(err);
        await transaction.rollback();
    }
    return new ActionResult(EActionStatus.error);
};

export { Db, RunTransaction };