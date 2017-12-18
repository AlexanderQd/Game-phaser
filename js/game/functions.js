function conexionError(){
    const errorMessage = "Error al intentar conectar compruebe su conexion a internet";
    let text = variables.Game.add.text(32, 32, errorMessage, { font: "15px Arial", fill: "#19de65" });

    setTimeout(() => {text.destroy()}, 3000);

}

function authenticationError(){
    const errorMessage = "Contraseña o email incorrectos";
    let text = variables.Game.add.text(32, 32, errorMessage, { font: "15px Arial", fill: "#19de65" });

    setTimeout(() => {text.destroy()}, 3000);
}