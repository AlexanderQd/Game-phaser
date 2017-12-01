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
                email: fields.email
            });
            res.json({message: 'Succesfull, user create'})
        });
    });
    
});
let user;
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

router.post('/match', Cors(), (req, res) => {
        Match.sync().then(() => {
            Match.create({
                mapID: 1,
                playerID: 2,
                userID: 1,
                nivelPlayer: 2,
                enemyState: 'alive',
                score: 200,
            });
            res.json({message: 'Succesfull, match create'})
        });
});
export default router;