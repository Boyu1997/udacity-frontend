const moment = require('moment');
const serverUrl = "http://localhost:8081";

export function displayNewTripForm() {
    document.querySelector('#new-trip-form').style.display = "block";
}

export function hideNewTripForm() {
    document.querySelector('#city-input').value = null;
    document.querySelector('#date-input').value = null;
    document.querySelector('#new-trip-form').style.display = "none";
}


export function createNewTrip() {
    const tripCity = document.querySelector('#city-input').value;
    const tripDate = document.querySelector('#date-input').value;
    const daysToTripDate = moment(tripDate,'YYYY-MM-DD').diff(moment(), 'days');

    // validate trip city input
    const cityRegex = new RegExp("^[A-z0-9, ]+$");
    if (!cityRegex.test(tripCity)) {
        alert("invalid city input: alphanumeric, comma, and whitespace only");
        return;
    }

    // validate trip date input
    if (daysToTripDate < 0) {
        alert("invalid date input: trip date cannot be a past date");
        return;
    }
    
    // request data from server api
    fetch(`${serverUrl}/geoname?city=${tripCity}`)
    .then(res => { return res.json() })   // geoname api
    .then(geonameData => {
        Promise.all([
            fetch(
                `${serverUrl}/weather?date=${tripDate}` +
                `&latitude=${geonameData.latitude}&longitude=${geonameData.longitude}`
            ).then(res => { return res.json() }),   // weather api
            fetch(
                `${serverUrl}/image?city=${geonameData.cityName}`
            ).then(res => { return res.json() })   // image api
        ]).then(dataSet => {
            // build trip data object
            const tripData = {
                id: `${tripDate}-${moment().format('X')}`,
                date: tripDate,
                cityName: geonameData.cityName,
                countryCode: geonameData.countryCode,
                avgHumidity: dataSet[0].avgHumidity,
                maxTemp: dataSet[0].maxTemp,
                minTemp: dataSet[0].minTemp,
                imageUrl: dataSet[1].imageUrl,
            }

            // find position to and insert new trip
            const storageTripDataSet = JSON.parse(localStorage.getItem('tripDataSet'));
            let insertBeforeId = null;
            for (const id in storageTripDataSet) {
                if (daysToTripDate < moment(storageTripDataSet[id].date,'YYYY-MM-DD').diff(moment(), 'days')) {
                    insertBeforeId = id;
                    break;
                }
            }

            const upcomingTripsContainer = document.querySelector('#upcoming-trips-container');
            const newTripContainer = Client.createTripContainer(tripData);
            if (insertBeforeId == null) {
                upcomingTripsContainer.appendChild(newTripContainer);
            }
            else {
                const insertBeforeTrip = document.getElementById(insertBeforeId);
                upcomingTripsContainer.insertBefore(newTripContainer, insertBeforeTrip)
            }

            // cleanup input area
            Client.hideNewTripForm();

            // update local storage
            storageTripDataSet[tripData.id] = tripData;
            const sortedTripDataSet = Object.keys(storageTripDataSet).sort().reduce((sorted, key) => {
                sorted[key] = storageTripDataSet[key];
                return sorted;
            }, {});
            localStorage.setItem('tripDataSet', JSON.stringify(sortedTripDataSet));
        })
    });
}
