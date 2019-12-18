const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const cities = require("./model/city");
const user = require("./model/user");
const actividades = require("./model/activity");
const itinerario = require("./model/itinerary");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const passport = require("passport");
var multer = require("multer");
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
//passport middleware
app.use(passport.initialize());
require("./passport/passport")

//MongoClient.connect('mongodb+srv://userDesa:userDesa123@mlabcluster-wfri4.mongodb.net/ProjectMern?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, db) => {
const db = config.get("mongoURI");
mongoose.connect(
  db,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, db) => {
    if (err) return console.log(err);
    console.log("conectado a la DB");
  }
);

app.listen(port, () => {
  console.log("Conectado a " + port);
});

/** Itinerario */
app.get("/itinerario/all", async (req, res) => {
  if (res.status(200)) {
    itinerario
      .find({})
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // res.send({ express: 'Hello From Express' });
});

app.get("/itinerario/:id", (req, res) => {
  let cityRequested = req.params.id;
  itinerario
    .find({ citi_id: cityRequested })
    .populate("citi_id")
    .then(itin => {
      res.send(itin);
      if (!itin)
        return res.status(404).send({ message: "El itinerario no existe" });
    })
    .catch(err => console.log(err));
});

/** Ciudades */

app.get("/city/all", async (req, res) => {
  if (res.status(200)) {
    cities
      .find({})
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // res.send({ express: 'Hello From Express' });
});

app.get("/city/:cityId", (req, res) => {
  let cityId = req.params.cityId;

  cities.findById(cityId, (err, city) => {
    if (err)
      return res.status(500).send({ message: "Error al realizar peticion" });
    if (!city)
      return res.status(404).send({ message: "El producto no existe" });

    res.status(200).send({ city });
  });
});

app.post("/city", (req, res) => {
  let ciudad = new cities();
  ciudad.name = req.body.name;
  ciudad.country = req.body.country;

  // console.log('POST /city');
  // console.log(req.body);
  // console.log('test');
  // res.end(); // end the response
  ciudad
    .save()
    .then(city => {
      res.send(city);
    })
    .catch(err => {
      res.status(500).send("Server error");
    });
  /*
  ciudad.save((err, guardado)=>{
    if (err) res.status(500).send({message: 'Error al guardar'})
    
    res.status(200).send({ciudad: guardado})
  })
*/
});

app.put("/city/:cityId", (req, res) => {
  let cityId = req.params.cityId;
  let update = req.body;

  cities.findByIdAndUpdate(cityId, update, (err, ciudadActualizada) => {
    if (err) res.status(500).send({ message: "Error al actualizar" });

    res.status(200).send({ city: ciudadActualizada });
  });
});

app.delete("/city/:cityId", auth, (req, res) => {
  let cityId = req.params.cityId;

  cities.findById(cityId, (err, city) => {
    if (err) res.status(500).send({ message: "Error al borrar" });

    city.remove(err => {
      if (err) res.status(500).send({ message: "Error al borrar" });
      res.status(200).send({ message: "Borrado" });
    });
  });
});

/** Actividades */
app.get("/actividades/all", async (req, res) => {
  if (res.status(200)) {
    actividades
      .find({})
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // res.send({ express: 'Hello From Express' });
});

/** Usuarios */
app.get("/usuarios/all", async (req, res) => {
  if (res.status(200)) {
    user
      .find({})
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // res.send({ express: 'Hello From Express' });
});


app.post("/usuarios", (req, res) => {
  console.log("POST /usuarios");
  let usuario = new user();
  usuario.userName = req.body.userName;
  usuario.password = req.body.password;
  usuario.email = req.body.email;
  usuario.name = req.body.name;
  usuario.country = req.body.country;

  user.findOne({ userName: usuario.userName }).then(result => {
    if (result) {
      res.status(200).send("Usuario Encontrado");
    } else {
      //hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(usuario.password, salt, (err, hash) => {
          if (err) throw err;

          usuario.password = hash;
          usuario.save(err => {
            if (err) res.status(200).send({ message: "Error al guardar" });

            jwt.sign(
              { userName: usuario.userName },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;

                res.json({
                  token,
                  user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email
                  }
                });
              }
            );
          });
        });
      });
    }
  });
});




/** login view */


app.post("/login", (req, res) => {

  let usuario = new user();
  usuario.userName = req.body.userName;
  usuario.password = req.body.password;
  user.findOne({ userName: usuario.userName }).then(user => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });
    // Validate password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign(
        { userName: usuario.userName },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              userName: user.userName,
              email: user.email
            }
          });
        }
      );
    });
  });
});

app.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let usuario = new user();
    usuario.userName = req.body.userName;
    user
      .findOne({ userName: usuario.userName })
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ error: "User does not exist!" }));
  }
);

app.get('/login/user', auth, (req, res) => {
  user.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

app.get('/login/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/login/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

/*  Fotos  */

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Methods", "GET,POST");
  next();
});
var imagenADevolver = "";
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/" + file.fieldname);
  },
  filename: function (req, file, callback) {
    if (/\.(gif|jpg|jpeg|tiff|png)$/.test(file.originalname)) {
      imagenADevolver = req.headers.userid + "." + file.mimetype.split("/")[1];
      callback(null, req.headers.userid + "." + file.mimetype.split("/")[1]);
    } else {
      callback("Extension no permitida", null);
    }
  }
});

var upload = multer({ storage: storage }).single("userPhoto");

app.post("/api/photo", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.send({ imagen: imagenADevolver });
  });
});

app.use(express.static(__dirname + "/uploads"));

// Downloading a single file
app.get("/file/user/:photo", (req, res) => {
  var file = __dirname + "/uploads/userPhoto/" + req.params.photo;
  res.contentType("image/" + mime.getType(file));
  res.download(file);
});
