
const express = require('express');
// instalamos morgan que nos permite visualizar un registro de las solicitudes hhtp get,post etc
const morgan = require('morgan');
const dotenv = require('dotenv')
// accde al archivo .env y carga todos los parametros que tenemos guardado ahi de manera global
dotenv.config();
// traemos lo que tenemos definido en database que es la configuracion de la base de datos y con el solo echo de importarlo ya se ejecuta y esto tiene que estar despues del dotenv.config
const mongoose = require('./database');
const { post } = require('./routes');

//============= Crear la aplicacion ====================

const app = express();

// =============PUERTO DE LA APP =====================
// aqui se accede lo que esta en .env que linqueamos con dotenv para acceder al port 
const PORT = process.env.PORT || 4000;

// Asignar un puerto donde se abrira el puerto no es necesario las mayusculas, esto generalmente viene del archivo de variable de entorno .env
// const PORT = 4000;

// ============= MIDDLEWARE =====================
  app.use(morgan('dev'));
  app.use(express.json()); // for parsing application/json este nos sirve para cuando tengamos el front y mandemos la info y la transforme a json
  app.use(express.urlencoded({ extended: true})); // for parsing para trabajar con postman y transforme a json la respuesta y no nos de problemas
  
// ================= RUTA PRINCIPAL===================
// Definir la ruta principal aqui traemos la ruta con un GET (tambien puede ser un post,delet,updat, etc)
// luego recibe un arrow function que recibe 2 parametros siempre que son req (request) y res (response)
app.get('/',(req,res)=>{
// siempre tiene que haber una respuesta si no no devuelve nada 
// res.send nos manda una respuesta a el servidor 
  res.send("Hola Mundo")
})
// accedemos a la ruta usuarios y al parametro id para devolver una respuesta 
// accedemos a la ruta a travez de la url / sola es la ruta de inicio /usuarios es la ruta usuarios 
app.get('/usuarios/:id',(req,res) => {
    // req.body son los parametros que trae en la solicitud
  // el req.params son los parametros que viene de la url 
console.log(req.params)
res.send("usuarios")
})

// ================= RUTAS =============
// aqui llamamos a todas las rutas que vamos a usar y le agregamos el prefijo api que le colocamos en routes.js 
// entonces cuando entremos a una ruta aqui directamente reemplaza ese valor en ./routes y lo identifica con la que mandamos
// se usa app.use porque en routes se define la accion post,get etc  
app.use('/api', require('./routes'))

// ==================== INICIAR LA APP ======================
// Iniciar la app la aplicacion escucha el puerto y recibe un callback que se encarga de ejecutar 

app.listen(PORT,()=>{
  console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})