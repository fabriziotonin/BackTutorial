const express = require('express');
// para simplificar la sintacions express.Router la simplificamos a router 
// esto nos permite definir rutas aqui y llamarlas en el archivo index con el app.get 
const router = express.Router();
// importamos la logica que va dentro de nuestra ruta /usuarios/ 
const usuarioController = require('./controllers/usuarioController');
// instalamos express-validator y lo importamos a muestras rutas 
const { check } = require('express-validator');

// =========== RUTA CREAR UN USUARIO ============
// usamos router y despues el metodo que usaremos post y dentro la ruta que usaremos omitiendo el api y un segundo parametro
// colocamos el metodo que usamos en esa ruta en este caso post pero tambien se puede colocar router.all para que acepte cualqueir verbo ya sea un get post, update ,etc 

//1er parametro api/usuario/ lo definimos con esta ruta solo por convencion de usar la palabra api
router.post('/usuarios/',
// 2do parametro colocamos el check que viene de express-validator y se encaga de controlar que los campos traidos de require.body en el post cumpla con esos requisitos 
[
  check('nombre','El nombre es obligatorio.').not().isEmpty(),
  check('email','El email es obligatorio.').not().isEmpty(),
  check('email','Ingrese un email válido.').isEmail(),
  check('password','El password es obligatorio.').not().isEmpty(),
  check('password','El password debe ser mínimo de 6 caracteres.').isLength({ min: 6})
]
//3er parametro en usuarioController entramos al archivo que esta en controladores y luego elegimos el modulo que corresponde a esta ruta en este caso crear usuario para que realize la logica escrita ahi 
,usuarioController.crearUsuario)

// asi seria si lo definimos todo aqui y no en archivos separados 
/* router.post('/usuarios/',(req,res) =>{
  // la logica que devuelve la ruta no se escribe aqui generalmente asique hay que traerla de otro lado 
  // console.log('Creando un usuario');
  // res.send('Hola');
}) */



// exportamos el modulo router para poder usar en el indexedDB.js 
module.exports = router;