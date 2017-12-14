import express, { Router } from 'express';
import sequelize from 'sequelize';
import User from './models/user';
import formidable from 'formidable';
import Match from './models/match';
import Character from './models/character';
import Scores from './models/scores';



const router = new Router();


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
                email: req.query.email                
            }
        }).then(data => {            
            res.json({
                id: data.id
            });
        }).catch(err => {
            res.json({
                id: null
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
router.get('/getScores', (req, res) => {
    let json = {items:[]};
    let count = 0;
    Scores.findAll().then(datas => {
        datas.forEach(data => User.findAll({
            where: data.user_id
        }).then( userData => {
            userData.forEach((users) => {
                json.items.push({name: users.name, score: data.score});
                count++;                
                if(count === datas.length){
                    res.json(json);
                }
            });

        }));
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