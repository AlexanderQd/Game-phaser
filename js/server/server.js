import Express from "express";
import BodyParser from 'body-parser';
import Morgan from 'morgan';
import routes from './route';
import Cors from 'cors';
import Passport from 'passport';
import cookieParse from 'cookie-parser';
import cookieSession from 'cookie-session';
import {config} from 'dotenv';
config();

const auth = require('./auth');

const app = Express();
app.use(BodyParser.urlencoded({ extended: true}));
app.use(BodyParser.json());
app.use(Morgan('dev'));
app.use(cookieParse());
app.use(cookieSession({   
    keys: [process.env.KeyCookies],
    maxAge: 24 * 60 * 60 * 1000
  }));

auth(Passport);
app.use(Passport.initialize());
app.use(Passport.session());
app.use(Cors());
app.use(routes);

app.listen(3000, ()=> console.log('The server listenning port 3000'));