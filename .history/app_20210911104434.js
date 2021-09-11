const express = require('express');
const app = express();

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log('Listening on port 3000');
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.get('/movies/:id', (req, res)=>{
    const id = req.params(id);
    res.json({
        message: "Voici le film n° `;
    })
})
