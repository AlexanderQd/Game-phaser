import express, { Router } from 'express';
import sequelize from 'sequelize';
import User from './models/user';
import formidable from 'formidable';
import Match from './models/match';
import Character from './models/character';
import Scores from './models/scores';
import Level1 from './models/Level1';
import DemonFly from './models/demon-fly';
import DemonWalk from './models/demon-walk';


const router = new Router();


DemonFly.sync({force: true}).then(()=>{
    DemonFly.create({
        health: 150,
        speed: 130,
        defense: 5,
        attack: 15,
     });
});
DemonWalk.sync({force: true}).then(()=>{
    DemonWalk.create({
        health: 100,
        speed: 100,
        defense: 0,
        attack: 5,
     });
});


router.post('/user/create', (req, res) => {
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

router.get('/user/getUser', (req, res) => {    
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

router.delete('/deleteUser', (req, res)=> {
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