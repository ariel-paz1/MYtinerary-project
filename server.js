const express = require('express');
//const MongoClient = require('mongodb').MongoClient

const bodyParser= require('body-parser')
//var ObjectID = require('mongodb').ObjectID;
const app = express();
const port = process.env.PORT || 5000;
const cities = require('./model/city')
const mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//MongoClient.connect('mongodb+srv://userDesa:userDesa123@mlabcluster-wfri4.mongodb.net/ProjectMern?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, db) => {
mongoose.connect('mongodb+srv://userDesa:userDesa123@mlabcluster-wfri4.mongodb.net/ProjectMern?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, db) => {  
  if (err) return console.log(err)

  console.log("conectado a la DB");

});

app.listen(port, () => {
  console.log("Conectado a " + port);
});

app.get('/city', async (req, res) => {

  if(res.status(200)){
      cities.find( {}).then( data => {
        console.log(data);
          res.json(data);
      }).catch( err =>  {console.log(err);});
  }

 

  // res.send({ express: 'Hello From Express' });
});

/*
app.get('/city', (req,res)=>{
  console.log(req.body);
  res.status(200).send({ 
    
    
    cities
   })
  
  cities.find({}, (err,cities)=>{
    if (err) return res.status(500).send({message: 'Error al realizar peticion'});
    if(!cities) return res.status(404).send({message: 'El producto no existe'});
  
    res.send(200, { cities });
  })
  
}) */

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

  ciudad.save((err, guardado)=>{
    if (err) res.status(500).send({message: 'Error al guardar'})
    
    res.status(200).send({ciudad: guardado})
  })
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


/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
*/