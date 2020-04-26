import 'module-alias/register';
import dotenv from 'dotenv'; dotenv.config();
import Application from './application';
import { Db } from './database';

Db.sync({ logging: false, force: false }).then(() => {
    console.log(`Database ${process.env.DB_NAME} Synchronized`);
});

Application.express.listen(3000, () => { 
    console.log('Runing server on port: 3000'); 
});
