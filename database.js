// instalamos mongoose y lo llamamos, para hacer nuestra conceccion a la base de datos 
const mongoose = require('mongoose');

// URI es la ruta de un servicio y la traemos del archivo .env la ruta DB_MONGO
const URI = process.env.DB_MONGO; 
// const URI = "mongodb://localhost/rollingcode-5a-primer-servidor"


// son opciones preEstablecidas son casi siempre lo mismo solo hay que copiar y pegar  
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};
// Le decimos a mongoose que se conecte a nuestra base de dato usando las opciones y la URI que creamos arriba 
mongoose.connect(URI, OPTIONS)
// en caso de exito le decimos con then que nos da un parametro y nos devuelve algo 
  .then(db => console.log('Base de datos conectada'))
  .catch( error =>{
    console.error(error)
    // detiene todo los procesos del servidor 
    process.exit(1)
  })