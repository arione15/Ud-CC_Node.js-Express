const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const PORT = 3000;
let frenchMovies = [];



var urlencodedParser = bodyParser.urlencoded({ extended: false }); // create application/x-www-form-urlencoded parser

app.use('/public', express.static('public')); // pour le fichier style.css
app.set('views', './views'); // renseigner le dossier des views
app.set('view engine', 'ejs'); // ca permet d'éviter de rajouter l'extension au nom de template dans les routes

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// Utilisation de bodyParser pour une route spécifique et pour des données JSON bodies
const jsonParser = bodyParser.json(); // create application/json parser
app.post('/movies', urlencodedParser, (req, res) => {
    // créer un movie in req.body
    console.log(req.body);
    res.sendStatus(201);
    const newMovie = {title: req.body.movietitle, year: req.body.movietitle};
    frenchMovies=[...frenchMovies, newMovie]; // ou bien frenchMovies.push(newMovie); mais dans ce cas on ne crée pas une copie du tableau 
    console.log(frenchMovies);
});


app.get('/', (req, res) => {
    res.render('index'); // on met le nom du template sans l'extension
});

app.get('/movies', (req, res) => {
    const title = 'Films français des trente dernières années';
    frenchMovies = [
        {title: 'Le fabuleux destin d\'Amélie Poulain', year: 2001},
        {title: 'Buffet froid', year: 1979},
        {title: 'Le diner de cons', year: 1998},
        {title: 'De rouille et d\'os', year: 2012},
        {title: 'Léon', year: 1996}
    ]
    res.render('movies', {movies: frenchMovies,
    title: title} );
});

app.get('/movies/add', (req, res) => {
    res.json({
        message: 'Ici c\'est la page du formulaire d\'ajout de formulaire.'
    });
});

app.get('/movies/:id/:title', (req, res) => {
    const id = req.params.id;
    const title = req.params.title;
    res.render('movie-details', {movieId: id,
    movietitle: title});
});

