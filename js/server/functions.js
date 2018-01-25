import express, { Router } from 'express';
import sequelize from 'sequelize';
import User from './models/user';
import Match from './models/match';
import Scores from './models/scores';

function createUser(data){
    const operator = sequelize.Op;    
    User.findOne({
        where : {[operator.or]: [{googleID: data.googleID}, {facebookID: data.facebookID}]}
    }).then( res => {        
           if(!res){
               User.create({
                    name: data.name,
                    facebookID: data.facebookID,
                    googleID: data.googleID,
                    matchs: [{      nivelPlayer: 1,                              
                                    score: 0,
                                    map_id: 1,
                                    character_id: null}],
                                    score: [{
          
                                    }]    
               }, {include:  [{model: Match, as: 'matchs'}, {model: Scores, as: 'score'}]}
            )}           
    })
}

const checkOriginLogin = (data) => {    
    if(data.profile){
        if(data.profile.provider === "google"){      
            let userdata = {name: data.profile.displayName, googleID: data.profile.id};
            createUser(userdata);
            return "User create";
        }else if(data.profile.provider === "facebook"){

        }      
    }
    return "Error to create user";
}
export default checkOriginLogin;