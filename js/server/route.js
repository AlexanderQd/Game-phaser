import express, { Router } from 'express';
import sequelize from 'sequelize';
import User from './models/user';
import formidable from 'formidable';
import Match from './models/match';
import Character from './models/character';
import Scores from './models/scores';
import Passport from 'passport';

const router = new Router();

router.post('/user/create', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
            User.create({                
                name: fields.name,
                password: fields.password,
                email: fields.email,
                matchs: [{    nivelPlayer: 1,                              
                              score: 0,
                              map_id: 1,
                              character_id: null}],
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
            }).then(res.json({message: 'Succesfull delete user'}));
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

router.put('/saveGame', (req, res) =>{    
    Match.update(
       { score: req.query.score },
       { where: {user_id: req.query.user_id} }
    ).then(Scores.update(
        {score: req.query.score},
        {where: { user_id: req.query.user_id }})        
    ).then(
        res.json({message: 'Succesfull, score save'})
    );
})
   
router.get('/selectCharacter', (req, res) => {    
    Character.findAll().then( response =>{
        res.json(response);
    })    
});

router.put('/setCharacterToMacth', (req, res) =>{    
    Match.update(
        {character_id: req.query.character_id},
        {where: {user_id: req.query.user_id}}
    ).then(res.json({message: 'Succesfull, character update'}))
});

router.get('/getMach', (req, res) => {
    Match.findOne({
        where : {user_id: req.query.user_id}
    }).then(response => {
        res.json(response);
    });
});

router.get('/getCharacterFromMatch',  (req, res) =>{
    Match.findOne({
        where: {id: req.query.id}
    }).then(response => {
        Character.findOne({
            where: {id: response.character_id}
        }).then(response => {
            res.json(response);
        });
    })
});

router.get('/auth/google', Passport.authenticate('google', {
    scope: ["profile"],

}));

router.get('/auth/google/callback', 
    Passport.authenticate('google'),
    (req, res) => {
        console.log(req.user.profile.photos)
        res.redirect("/user/create")
    }
);

export default router;