const express = require('express');
//const MongoClient = require('mongodb').MongoClient

const bodyParser= require('body-parser')
//var ObjectID = require('mongodb').ObjectID;
const app = express();
const port = process.env.PORT || 5000;
const cities = require('./model/city')
const user = require('./model/user')
const itinerario = require('./model/itinerary')
const mongoose = require('mongoose');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors());
//MongoClient.connect('mongodb+srv://userDesa:userDesa123@mlabcluster-wfri4.mongodb.net/ProjectMern?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, db) => {
mongoose.connect('mongodb+srv://userDesa:userDesa123@mlabcluster-wfri4.mongodb.net/ProjectMern?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {  
  if (err) return console.log(err)
  console.log("conectado a la DB");
});

app.listen(port, () => {
  console.log("Conectado a " + port);
});

/** Itinerario */
app.get('/itinerario', async (req, res) => {

  if(res.status(200)){
    itinerario.find( {}).then( data => {
        console.log(data);
          res.json(data);
      }).catch( err =>  {console.log(err);});
  }
  // res.send({ express: 'Hello From Express' });
});


app.get('/itinerario/:id',	(req, res) => {
      let cityRequested = req.params.id;
        itinerario.findOne({ citi_id: cityRequested })
        .populate('citi_id')
        .then(itin => {
          res.send(itin);
          if(!itin) return res.status(404).send({message: 'El itinerario no existe'})
        })
        .catch(err => console.log(err));
      
});

/** Ciudades */

app.get('/city', async (req, res) => {

  if(res.status(200)){
      cities.find( {}).then( data => {
        console.log(data);
          res.json(data);
      }).catch( err =>  {console.log(err);});
  }
  // res.send({ express: 'Hello From Express' });
});

app.get('/city/:cityId', (req,res)=>{
  let cityId = req.params.cityId

  cities.findById(cityId, (err,city)=>{
    if (err) return res.status(500).send({message: 'Error al realizar peticion'})
    if(!city) return res.status(404).send({message: 'El producto no existe'})
  
    res.status(200).send({ city })
  })

}) 

app.post('/city', (req,res)=>{
  console.log('POST /city');
  console.log(req.body);

  let ciudad = new cities()
  ciudad.name = req.body.name;
  ciudad.country = req.body.country;
  console.log('POST /city');
  console.log(req.body);
  console.log('test');
  res.end(); // end the response
  // ciudad.save()
  // .then(city => {
  //   res.send(city)
  //   })
  //   .catch(err => {
  //   res.status(500).send("Server error")}) 
/*
  ciudad.save((err, guardado)=>{
    if (err) res.status(500).send({message: 'Error al guardar'})
    
    res.status(200).send({ciudad: guardado})
  })
*/
})

app.put('/city/:cityId', (req,res)=>{
  let cityId = req.params.cityId;
  let update = req.body;
  
  cities.findByIdAndUpdate(cityId, update, (err, ciudadActualizada)=>{
    if (err) res.status(500).send({message: 'Error al actualizar'});
  
    res.status(200).send({ city: ciudadActualizada});
  })
})

app.delete('/city/:cityId', (req,res)=>{
  let cityId = req.params.cityId;

  cities.findById(cityId, (err, city)=>{
    if (err) res.status(500).send({message: 'Error al borrar'})

    city.remove(err=>{
      if (err) res.status(500).send({message: 'Error al borrar'});
      res.status(200).send({message: 'Borrado'});
    })
  })
})

/** Usuarios */
app.get('/usuarios', async (req, res) => {

  if(res.status(200)){
    user.find( {}).then( data => {
        console.log(data);
          res.json(data);
      }).catch( err =>  {console.log(err);});
  }

 

  // res.send({ express: 'Hello From Express' });
});


app.post('/usuarios', (req,res)=>{
  console.log('POST /usuarios');
  console.log(req.body);
  //let userName = req.body.userName;
  let usuario = new user()
  usuario.userName = req.body.userName;
  usuario.password = req.body.password;
  usuario.email = req.body.email;
  usuario.name = req.body.name;
  usuario.country = req.body.country;
  user.findById(usuario.userName, (err,user)=>{
    if (err) res.status(500).send({message: 'Usuario Existente'})
    else{
      usuario.save((err, guardado)=>{
        if (err) res.status(500).send({message: 'Error al guardar'})
        res.status(200).send({usuario: guardado})
      })
    }
  })
})