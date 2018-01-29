
/**
 * @author Alexander Quintana Diaz
 * @file this file contains functions
 */
/**
 * @description This function handler conexion errors
 */
function conexionError(){
    const errorMessage = "Error al intentar conectar compruebe su conexion a internet";
    let text = variables.Game.add.text(32, 32, errorMessage, { font: "15px Arial", fill: "#19de65" });

    setTimeout(() => {text.destroy()}, 3000);

}

/**
 * @description this function handler authentication erros
 */
function authenticationError(){
    const errorMessage = "Contraseña o email incorrectos";
    let text = variables.Game.add.text(32, 32, errorMessage, { font: "15px Arial", fill: "#19de65" });

    setTimeout(() => {text.destroy()}, 3000);
}
/**
 * 
 * @param {Object} saveparam
 * @description when player overlap this object the game connect with api and save score of this match in the server
 */
function saveGame(saveparam){    
    saveparam.body = null;

    let url = new URL("http://localhost:3000/saveGame");
    let params = {score: points, user_id: variables.userId};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    fetch(url, {
        method: "PUT",
        mode: "cors"                    
    }).then((res) => {
       return res.json()                        
    }).catch(err => {conexionError()});

}

/**
 * 
 * @param {Object} player 
 * @param {Object} potion
 * @description this function handler the collision between player and potions 
 */
function collisionHandlerLoot(player, potion){
    switch(potion.key){
        case 'powerpotion': player.damage += 2;
            break;
        case 'manapotion': player.mana += 10;
            break;
        case 'lifepotion': player.health += 10;
            break;
    }
    if(player.mana > player.maxMana){
        player.mana = player.maxMana;
    }
    if(player.health > player.maxHealth){
        player.health = player.maxHealth;
    }
    potion.destroy();
}

function changeStateGame(state){
    variables.Game.state.start(state);
}

function getIdFromURL(){            
    let params = {};
    let param_array = window.location.href.split('?')[1].split('#');
    for(let i in param_array){
        x = param_array[i].split('=');
        params[x[0]] = x[1];
    }
    sessionStorage.setItem('key', params.id);
}