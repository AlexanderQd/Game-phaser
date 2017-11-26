import express, { Router } from 'express';
import sequelize from 'sequelize';
import User from './model';
import Cors from 'cors';
import formidable from 'formidable';

const router = new Router();

router.post('/user/create', Cors(), (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        User.sync({force: false}).then(() => {
            User.create({
                name: fields.name,
                password: fields.password,
                email: fields.email
            });
            res.json({message: 'Succesfull, user create'})
        });
    });
    
});
let user;
router.get('/user/getId', Cors(), (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) =>{
      user =   User.findOne({
            where: {name: fields.name}
        }).then(console.log(user.id));
    });
});
export default router;