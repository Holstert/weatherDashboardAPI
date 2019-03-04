const express = require('express');
const axios = require('axios')
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const apiKey = '6da84b8659c84a00a45ceaba476f1fc9';
const Cities = [
    {
        city: "Obregon",
        country: "MX",
    },
    {
        city: "Navojoa",
        country: "MX",
    },
    {
        city: "Hermosillo",
        country: "MX",
    },
    {
        city: "Nogales",
        country: "MX",
    }
];
const Scales = [
    {
        scale: "Celsius",
        units: "I"
    },
    {
        scale: "Fahrenheit",
        units: "S"
    }
];

app.get('/getCities', function(req, res) {
    res.json(Cities);
});
app.get('/getScales', function(req, res) {
    res.json(Scales);
});
app.get('/getTempCity/:city/:units/:days', function(req, res) {
    const params = req.params;
    const urlApiWeather = `http://api.weatherbit.io/v2.0/forecast/daily?city=${params.city}&country=MX&state=Sonora&units=${params.units}&days=${params.days}&key=${apiKey}`
    
    axios.get(urlApiWeather)
    .then(resp => {    
        let data = {...resp.data};
        console.log(data);
        let resParse = data.data.map((item) => {
            return {data : item.max_temp, datetime: item.datetime}
        });

        res.json({
            ...data,
            data: resParse 
        })
    })
    .catch( e => console.log ('Error', e));
});

module.exports = app;