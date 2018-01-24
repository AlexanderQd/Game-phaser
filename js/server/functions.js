import express, { Router } from 'express';
import sequelize from 'sequelize';
import User from './models/user';
import Match from './models/match';
import Scores from './models/scores';

function createUser(data){
   return User.create({                
        name: data.name,
        password: data.password,
        email: data.email,
        facebookID: data.facebookID,
        googleID: data.googleID,        
        matchs: [{    nivelPlayer: 1,                              
                      score: 0,
                      map_id: 1,
                      character_id: null}],
        score: [{
            
        }]
        
    },
      {include:  [{model: Match, as: 'matchs'}, {model: Scores, as: 'score'}]}
   );
}

const checkOriginLogin = (data) => {
    if(data.profile.provider === "google"){
        let email = "";
        data.profile.emails.forEach(element => {
            email = element.value
        });
        let userdata = {name: data.profile.displayName, email: email, password: "", facebookID: null, googleID: data.profile.id};
        createUser(userdata);
        return email;
    }else if(data.profile.provider === "facebook"){

    }else if(data.profile.provider === undefined){
        let userdata = {name: data.name, password: data.password, email: data.email, facebookID: data.facebookID, googleID: data.googleID};
        return createUser(userdata);
    }
    return "no entra en nada";
}
export default checkOriginLogin;