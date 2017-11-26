import Express from "express";
import BodyParser from 'body-parser';
import Morgan from 'morgan';
import routes from './route';

const app = Express();
app.use(BodyParser.urlencoded({ extended: true}));
app.use(BodyParser.json());

app.use(Morgan('dev'));
app.use(routes);

app.listen(3000, ()=> console.log('The server listenning port 3000'));