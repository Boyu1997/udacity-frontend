import { displayNewTripForm, hideNewTripForm, createNewTrip } from './js/newTrip';
import { createTripContainer, removeTripContainer } from './js/tripContainer';

import './styles/main.scss';
import './styles/newTrip.scss';
import './styles/upcomingTrips.scss';

const moment = require('moment');

window.onload = function() {
    if (localStorage.getItem('tripDataSet')) {
        const storageTripDataSet = JSON.parse(localStorage.getItem('tripDataSet'));
        let futureTripDataSet = {};   // future trips to display and keep
        for (const id in storageTripDataSet) {
            if (moment(storageTripDataSet[id].date, 'YYYY-MM-DD').diff(moment(), 'days') >= 0) {
                const tripContainer = Client.createTripContainer(storageTripDataSet[id]);
                document.querySelector('#upcoming-trips-container').appendChild(tripContainer);
                futureTripDataSet[id] = storageTripDataSet[id];
            }
        }
        localStorage.setItem('tripDataSet', JSON.stringify(futureTripDataSet));
    }
    else {
        localStorage.setItem('tripDataSet', JSON.stringify({}));
    }

    document.getElementById('new-trip-button').addEventListener('click', Client.displayNewTripForm);
    document.getElementById('new-trip-form-submit').addEventListener('click', Client.createNewTrip);
    document.getElementById('new-trip-form-cancel').addEventListener('click', Client.hideNewTripForm);
};

export { 
    displayNewTripForm,
    hideNewTripForm,
    createNewTrip,
    createTripContainer,
    removeTripContainer
};
