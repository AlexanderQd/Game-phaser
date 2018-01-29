import express, { Router } from 'express';
import sequelize from 'sequelize';
import User from './models/user';
import Match from './models/match';
import Scores from './models/scores';

function createUser(data){
    const operator = sequelize.Op;
     
   return User.findOne({
        where : {[operator.or]: [{googleID: data.googleID}, {facebookID: data.facebookID}]}
    }).then( res => {        
           if(!res){
              return User.create({
                    name: data.name,
                    facebookID: data.facebookID,
                    googleID: data.googleID,
                    userPhoto: data.userPhoto,
                    matchs: [{      nivelPlayer: 1,                              
                                    score: 0,
                                    map_id: 1,
                                    character_id: null}],
                                    score: [{
          
                                    }]    
               }, {include:  [{model: Match, as: 'matchs'}, {model: Scores, as: 'score'}]}
            ).then(user => user)
            .catch(err => {
                console.log(err)
            })
        }else{
            return res
        }
    }).catch(error => console.log(error));
}

const checkOriginLogin = (profile) => {    
    if(profile){
        if(profile.provider === "google"){
            let userdata = {name: profile.displayName, googleID: profile.id, userPhoto: profile.photos[0].value};            
            return createUser(userdata);
        }else if(profile.provider === "facebook"){

        }      
    }   
    
}
export default checkOriginLogin;