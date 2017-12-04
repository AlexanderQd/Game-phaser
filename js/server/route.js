import express, { Router } from 'express';
import sequelize from 'sequelize';
import User from './user';
import Cors from 'cors';
import formidable from 'formidable';
import Match from './match';

const router = new Router();

router.post('/user/create', Cors(), (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        User.sync().then(() => {
            User.create({                
                name: fields.name,
                password: fields.password,
                email: fields.email,
                matchs: [{    nivelPlayer: 1,
                              enemyState: 'alive',
                              score: 0,}]
            },
              {include:  [{model: Match, as: 'matchs'}]}
           ).then((user) =>{           
                    res.json({message: 'Succesfull, user create'})         
              });                 
        });
    });
    
});

router.get('/user/getUser', Cors(), (req, res) => {    
    User.findOne({
            where: {
                email: req.query.email,
                password: req.query.password
            }
        }).then(data => {
            res.json({
                id: data.id
            });
        });
    
});
export default router;