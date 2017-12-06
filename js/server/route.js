import express, { Router } from 'express';
import sequelize from 'sequelize';
import User from './user';
import Cors from 'cors';
import formidable from 'formidable';
import Match from './match';
import GameMaps from './map';
import Character from './character';
import Scores from './scores';

const router = new Router();


router.post('/user/create', Cors(), (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {       
            User.create({                
                name: fields.name,
                password: fields.password,
                email: fields.email,
                matchs: [{    nivelPlayer: 1,
                              enemyState: 'alive',
                              score: 0,
                              map_id: 1 }],
                score: [{

                }]
                
            },
              {include:  [{model: Match, as: 'matchs'}, {model: Scores, as: 'score'}]}
           ).then((user) =>{           
                    res.json({message: 'Succesfull, user create'})         
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

router.delete('/deleteUser', Cors(), (req, res)=> {
       let form = new formidable.IncomingForm();    
        form.parse(req, (err, fields, file) => {           
            User.findOne({
                where: { email: fields.email }
            }).then(user => {
                Match.findOne({
                    where:{
                        user_id: user.id
                    }
                }).then(match => {
                    match.destroy();
                    user.destroy();
                });                
            });
        });     
});
/*router.delete('/deleteMatch', Cors(), (req, res)=> {
    let form = new formidable.IncomingForm();    
     form.parse(req, (err, fields, file) => {
         User.findOne({
             where: { email: fields.email }
         }).then(user => {
             Match.findOne({
                where: {id: user.id }
             }).then(console.log("entra en el primero"));             
         }).then(console.log("Entra en el segundo"));
     });     
});*/
export default router;