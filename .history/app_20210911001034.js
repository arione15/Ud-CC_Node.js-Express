const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    console.log('Listening on port 3000!!!!');
    app.listen(3000, ()=>{
    });
    res.send('Hello World');
});
