var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const moment = require('moment');

const geonamesBaseUrl = "http://api.geonames.org/search";
const weatherbitBaseUrl = "https://api.weatherbit.io/v2.0";
const pixabayBaseUrl = "https://pixabay.com/api";


const dotenv = require('dotenv');
dotenv.config();
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

console.log(__dirname);

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});


app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

app.get('/weather', async function (req, res) {
    const tripCity = req.query.city;
    const tripDate = req.query.date;


    // get city latitude and longitude from geonames api
    const geonamesResponse = await fetch(
        `${geonamesBaseUrl}?q=${tripCity}&type=json&username=${GEONAMES_USERNAME}`
    );
    try {

        // extract latitude and longitude data
        const geonamesApiData = await geonamesResponse.json();
        const lat = geonamesApiData.geonames[0].lat;
        const lng = geonamesApiData.geonames[0].lng;
        

        // get weather data from weatherbit api
        // assumption: all datetime data from client and api are in UTC (or the same timezone)
        const daysFromNow = moment(tripDate, 'YYYY-MM-DD').diff(moment(), 'days');
        if (daysFromNow < 0) {
            res.send('error: cannot plan trip for the past');
        }
        else if (daysFromNow < 16) {   // get weather forecast
            const weatherbitResponse = await fetch(
                `${weatherbitBaseUrl}/forecast/daily?key=${WEATHERBIT_API_KEY}&lat=${lat}&lon=${lng}`
            );
            try {
                const weatherbitApiData = await weatherbitResponse.json();
                const weatherData = {
                    date: weatherbitApiData.data[daysFromNow].datetime,
                    maxTemp: weatherbitApiData.data[daysFromNow].max_temp,
                    minTemp: weatherbitApiData.data[daysFromNow].min_temp,
                    avgHumidity: weatherbitApiData.data[daysFromNow].rh,
                    pop: weatherbitApiData.data[daysFromNow].pop,   // probability of precipitation
                };
                res.send(weatherData);
            } catch (error) {
                console.log('weatherbit api error', error);
                res.send(500);
            }
        }
        else {   // get historical weather

            /* the free version of weatherbit api only allow 1 day per request for historical weather data;
                this implementation uses only the first and last day of the month in the previous year to
                estimate the weather; this is to avoid exceeding the api free quota or slowdown from too many api calls;
                the better approach is to use the mean of all the previous year data of the month to generate a forecast */

            const startDate = moment(tripDate, 'YYYY-MM-DD').subtract(1,'year').startOf('month').format('YYYY-MM-DD');
            const endDate = moment(tripDate, 'YYYY-MM-DD').subtract(1,'year').endOf('month').format('YYYY-MM-DD');

            const weatherData = await Promise.all([startDate, endDate].map(date => {
                return fetch(
                    `${weatherbitBaseUrl}/history/daily?key=${WEATHERBIT_API_KEY}&lat=${lat}&lon=${lng}` +
                    `&start_date=${date}&end_date=${moment(date, 'YYYY-MM-DD').add(1,'day').format('YYYY-MM-DD')}`
                ).then(r => {
                    try {
                        return r.json();
                    } catch (error) {
                        console.log('weatherbit api error', error);
                        res.send(500);
                    }
                });
            })).then(weatherbitApiDatas => {
                let avgWeatherData = { maxTemp: 0, minTemp: 0, avgHumidity: 0 };
                weatherbitApiDatas.forEach(weatherbitApiData => {
                    avgWeatherData.maxTemp += weatherbitApiData.data[0].max_temp;
                    avgWeatherData.minTemp += weatherbitApiData.data[0].min_temp;
                    avgWeatherData.avgHumidity += weatherbitApiData.data[0].rh;
                });
                avgWeatherData.maxTemp /= 2;
                avgWeatherData.minTemp /= 2;
                avgWeatherData.avgHumidity /= 2;
                return avgWeatherData;
            });
            res.send(weatherData);
        }
    } catch (error) {
        console.log('geonames api error', error);
        res.send(500);
    }
});

app.get('/image', async function (req, res) {
    const tripCity = req.query.city;

    const pixabayResponse = await fetch(`${pixabayBaseUrl}?q=${tripCity}&key=${PIXABAY_API_KEY}&per_page=3`);
    try {
        const pixabayApiData = await pixabayResponse.json();
        const imageUrl = pixabayApiData.hits[0].webformatURL;
        res.send(imageUrl);
    } catch (error) {
        console.log('weatherbit api error', error);
        res.send(500);
    }
});
