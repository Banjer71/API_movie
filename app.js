const express = require('express');
const app = express();
const request = require('request');

//set the folder to be view by ejs and render the html page
app.set('view engine', 'ejs');
app.use(express.static(__dirname ));

app.get('/', (req, res) => {
    res.render('search');
})
app.get('/results', (req, res) => {
    let movie = req.query.movie_f;
    let url = `http://www.omdbapi.com/?s=${movie}&apikey=thewdb`;
    request( url, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            const data = JSON.parse(body);
            //res.send(data['Search'][0]['Title']);
            res.render('results', {data});
        } else {
            console.log('SOMETHING WENT WRONG!!');
            console.log(err);
        }
    })
});


app.listen(3000, process.env.PORT, process.env.IP, () => {
    console.log('server movie started!!!');
});