const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs'); // ca permet d'éviter de rajouter l'extension au nom de template dans les routes

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Listening on port 3000');
});

app.get('/', (req, res) => {
    res.render('index'); // on met le nom du template sans l'extension
});

app.get('/movies', (req, res) => {
    res.send('Bientôt des films içi !!');
});

app.get('/movies/add', (req, res) => {
    res.json({
        message: 'Ici c\'est la page du formulaire d\'ajout de formulaire.'
    });
});

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: `Voici le film n° ${id}`
    })
});

