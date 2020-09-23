const { Schema, Mongoose } = require("mongoose");
// instalamos expressvalidator y traemos este constante que trae los mensajes de error de la validacion en que esta en route js 
const { validationResult } = require('express-validator');

//instalamos bcryptjs lo llamamos desde el controlador porque no necesitamos llamarlo en toda la applicationCache
// Lo que hace el bcryptjs nos encripta y hashea nuestra contraseña
const bcryptjs = require('bcryptjs');

// los controladores reciben su nombre en general en singular y define la parte interna que deberia ejecutar la ruta en routes.js
//========== antes de usar Schema con Mongoose ====== 
/* exports.crearUsuario = (req,res) => {
//  se crea esa logica que pusimos en routesjs pero ahora separado 
  console.log('Creando un usuario desde el controlador');
  // req.body son los parametros que trae en la solicitud (usando postman o a travez de un post body en front)
  // el req.params son los parametros que viene de la url 
  console.log(req.body);
  res.send('Hola');
} */

// ================ Usando Schema Mongoose ===============
// importamos el Modelos de usuario 
const Usuario = require('../models/Usuario')
exports.crearUsuario = async (req,res) => {
// Revisar si hay errores
const errores = validationResult(req);
if(!errores.isEmpty()){
    return res.status(400).json({ errors: errores.array() });
}
// aqui traemos desde el reques en el body los parametros email y password para poder usarlo y ponerle los controles
let { email, password } = req.body;

  try{
    // aqui usamos findOne de mongoose para poder buscar un usuario segun los parametros que mandemos(le pasamos {parametro: valor} y si coincide se puede poner una vez email: email)
    let usuario = Usuario.findOne({ email });
    // ese usuario nos devuelve un null si no lo encuentra 

    if(usuario){
      return res.status(400).json({msg: "El email ingresado ya existe"})
    }else{

    }
    // crear un usuario 
    // aqui agregamos los datos que vienen del body de que nos mandan los datos por front o postman
     usuario = new Usuario(req.body)
    //  aqui le asignamos al password la encriptacion de la password 
     usuario.password = bcryptjs.hashSync(password, 8)

    // Guarda el ususario en la base de datos y es asincronico
   await usuario.save()
    // mandamos un json como respuesta para poder usarlo en el front es el mensaje que podra suar para notificar que fue creado correctamente el usuario
   res.json({msg: 'Usuario creado correctamente.', usuario});

  } catch (error) {
    console.log(error)
    res.status(400).json({msg: "Hubo un error"});
  }
}