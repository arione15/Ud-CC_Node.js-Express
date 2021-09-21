const express = require("express");
const app = express();

const bodyParser = require("body-parser"); // middleware pour récuperer les données postées (POST)
const urlencodedParser = bodyParser.urlencoded({ extended: false }); // create application/x-www-form-urlencoded parser

const multer = require("multer");
const upload = multer();

const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config();

// to verify token on the request header
const expressJwt = require('express-jwt'); 
const mySecret = process.env.MY_SECRET;
// check token on all pages except the ones mentioned in unless()
app.use(expressJwt({ secret: mySecret, algorithms: ['RS256']}).unless({ path: ['/login'] }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

let frenchMovies = [];

app.use("/public", express.static("public")); // pour le fichier style.css
app.set("views", "./views"); // renseigner le dossier des views
app.set("view engine", "ejs"); // ca permet d'éviter de rajouter l'extension au nom de template dans les routes

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// Utilisation de bodyParser pour une route spécifique et pour des données JSON bodies
//const jsonParser = bodyParser.json(); // create application/json parser

/* 1ère méthode avec body-parser */
// app.post('/movies', urlencodedParser, (req, res) => {
//     // créer un movie in req.body
//     console.log('Titre : ' + req.body.movieTitle);
//     console.log('Année : ' + req.body.movieYear);
//     const newMovie = {title: req.body.movieTitle, year: req.body.movieYear};
//     frenchMovies=[...frenchMovies, newMovie]; // ou bien frenchMovies.push(newMovie); mais dans ce cas on ne crée pas une copie du tableau
//     console.log(frenchMovies);
//     res.sendStatus(201);
// });

/* 2èmee méthode avec multer */
app.post("/movies", upload.fields([]), (req, res) => {
  if (!req.body) {
    return res.sendStatus(500);
  } else {
    //const formData = req.body;
    //console.log('formData : ', formData);
    const newMovie = { title: req.body.movieTitle, year: req.body.movieYear };
    frenchMovies = [...frenchMovies, newMovie]; // ou frenchMovies.push(newMovie);
    res.sendStatus(201);
  }
});

app.get("/", (req, res) => {
  res.render("index"); // on met le nom du template sans l'extension
});

app.get("/movies", (req, res) => {
  const title = "Films français des trente dernières années";
  frenchMovies = [
    { title: "Le fabuleux destin d'Amélie Poulain", year: 2001 },
    { title: "Buffet froid", year: 1979 },
    { title: "Le diner de cons", year: 1998 },
    { title: "De rouille et d'os", year: 2012 },
    { title: "Léon", year: 1996 },
  ];
  res.render("movies", {
    movies: frenchMovies,
    title: title,
  });
});

app.get("/movies/add", (req, res) => {
  res.json({
    message: "Ici c'est la page du formulaire d'ajout de formulaire.",
  });
});

app.get("/movies/:id/:title", (req, res) => {
  const id = req.params.id;
  const title = req.params.title;
  res.render("movie-details", {
    movieId: id,
    movietitle: title,
  });
});

app.get("/movie-search", (req, res) => {
  res.render("movie-search");
});

// route pour login : get et post (pour post on utilisera urlencodedParser)
app.get("/login", (req, res) => {
  res.render("login", { title: "Espace membre" });
});

const fakeuser = { email: "fakeuser@fakeemail.fr", password: "qsd" };

app.post("/login", urlencodedParser, (req, res) => {
  //console.log("login post", req.body);
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (
      req.body.email === fakeuser.email &&
      req.body.password === fakeuser.password
    ) {
      res.json(
        jwt.sign(
          {
            iss: "http://expressmovies.fr",
            user: "Mas",
            role: "moderator",
          },
          mySecret
        )
      );
    } else {
      res.sendStatus(401);
    }
  }
});

app.get('/member-only', (req, res) => {
  authController.getMemberOnly);
