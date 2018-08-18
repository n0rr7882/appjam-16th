import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import constants from './config/constants';

import routes from './routes';

import { auth } from './tools/authentication';

import './database/db';

const app = express();

app.disable('x-powered-by');

app.use(logger(constants.LOG_FORMAT));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(`${__dirname}/uploads`));
app.use(fileUpload());
app.use(cors());

app.use(auth);

app.use('/api', routes);

app.listen(constants.PORT, () => {
    console.log(`Server listen to port: ${constants.PORT}`);
});