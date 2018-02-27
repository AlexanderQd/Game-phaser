import sequelize from 'sequelize';
import User from './models/user';
import Match from './models/match';
import Scores from './models/scores';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const githubStrategy = require('passport-github').Strategy;

module.exports = (passport) =>{
    passport.serializeUser((user, done) => {        
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {        
        User.findById(id).then((user) => {
            done(null, user);
        }).catch((err) => console.log(err));
        
    });
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK
        },
        (accesToken, refreshToken, profile, done) =>{      
            
           User.findOne({
                where : {googleID: profile.id}
            }).then( res => {        
                   if(!res){
                      User.create({
                            name: profile.displayName,                            
                            googleID: profile.id,
                            userPhoto: profile.photos[0].value,
                            matchs: [{      nivelPlayer: 1,                              
                                            score: 0,
                                            map_id: 1,
                                            character_id: null}],
                                            score: [{
                  
                                            }]    
                       }, {include:  [{model: Match, as: 'matchs'}, {model: Scores, as: 'score'}]}
                    ).then(user => done(null, user))
                    .catch(err => {
                        console.log(err)
                    })
                }else{
                    return done(null, res);
                }                
            }).catch(error => console.log(error));          
        }));

        passport.use(
            new githubStrategy({
                clientID: process.env.GITHUB_ID,
                clientSecret: process.env.GITHUB_CLIENT,
                callbackURL: process.env.GITHUB_CALLBACK
            },  (accesToken, refreshToken, profile, done) =>{      
            
                User.findOne({
                     where : {githubID: profile.id}
                 }).then( res => {        
                        if(!res){
                           User.create({
                                 name: profile.username,                            
                                 githubID: profile.id,
                                 userPhoto: profile.photos[0].value,
                                 matchs: [{      nivelPlayer: 1,                              
                                                 score: 0,
                                                 map_id: 1,
                                                 character_id: null}],
                                                 score: [{
                       
                                                 }]    
                            }, {include:  [{model: Match, as: 'matchs'}, {model: Scores, as: 'score'}]}
                         ).then(user => done(null, user))
                         .catch(err => {
                             console.log(err)
                         })
                     }else{
                         return done(null, res);
                     }                
                 }).catch(error => console.log(error)); 

            })
        )
        
}


