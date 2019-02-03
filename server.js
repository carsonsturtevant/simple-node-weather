const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

const apiKey = '06159cee86299a437a4e79ff741ac713';

app.get('/', function(req, res) {
    res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    
    request(url,  function(err,response,body) {
        if(err) {
            res.render('index', {weather: null, error: 'Error, please try again.'});
            console.log('error: ', error);
        } else {
            let weather = JSON.parse(body);
    
            if(weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, please try again.'});
            console.log('error: ', error);
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
                console.log(weatherText);
            }
    
        }
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});


