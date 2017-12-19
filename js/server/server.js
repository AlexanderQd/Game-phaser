import Express from "express";
import BodyParser from 'body-parser';
import Morgan from 'morgan';
import routes from './route';
import Cors from 'cors';

const app = Express();
app.use(Cors());
app.use(BodyParser.urlencoded({ extended: true}));
app.use(BodyParser.json());
app.use(Morgan('dev'));
app.use(routes);

app.listen(3000, ()=> console.log('The server listenning port 3000'));