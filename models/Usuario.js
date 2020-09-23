// Los modelos son estrucuturas creadas para crear en la base de datos de mongo a travez de mongoose que nos permite darle sierta estructura al objeto, se lo define generalmente al archivo en mayusculas y en singular
const mongoose = require('mongoose');

// ================ DEFINIMOS EL ESQUEMA ============
// aqui se define el esquema que llevara nuestro objeto que ira guardado en nuestro mongo 
const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required:true,
    trim: true
  },
  email: {
    // el type siempre va definido 
    type: String,
    // el required hace que este campo sea obligatorio 
    required:true,
    // trim elimina los espacios en blanco 
    trim: true,
    // unique nos permite revisar que este email no este repetido 
    unique:true
  },
  password: {
    type: String,
    required:true,
    trim: true,
  },
  created_at: {
    type: Date,
    // le damos un valor por defecto que en este caso es la fecha de ese momento cuando se crea 
    default: Date.now()
  }
})

//============ Definir el modelo Usuario con el Schema  ========
// aqui se exporta ya el modulo con mongoose y se le pasa dos parametros
// el 1primero es el nombre que recibira que es por convencio el mismoq ue el nombre del archivo
// el 2do es el schema que creamos arriba 
module.exports = mongoose.model('Usuario', UsuarioSchema);