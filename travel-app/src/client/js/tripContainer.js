const moment = require('moment');

export function removeTripContainer(event) {
    const tripContainer = event.target.parentNode.parentNode;
    const tripId = tripContainer.id;
    tripContainer.remove();

    // update local storage
    const storageTripDataSet = JSON.parse(localStorage.getItem('tripDataSet'));
    delete storageTripDataSet[tripId];
    localStorage.setItem('tripDataSet', JSON.stringify(storageTripDataSet));
}

export function createTripContainer(tripData) {
    // define image container
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'image-container');

    const image = document.createElement('img');
    image.setAttribute('src', tripData.imageUrl);
    imageContainer.appendChild(image);

    // define trip info container
    const tripInfoContainer = document.createElement('div');
    tripInfoContainer.setAttribute('class', 'trip-info-container');
    
    const title1 = document.createElement('h3');
    title1.innerText = `Trip to: ${tripData.cityName}, ${tripData.countryCode}`;
    tripInfoContainer.appendChild(title1);
    const title2 = document.createElement('h3');
    title2.innerText = `Departing on: ${tripData.date}`;
    tripInfoContainer.appendChild(title2);

    tripInfoContainer.appendChild(document.createElement('hr'));

    const line1 = document.createElement('p');
    const dayCount = moment(tripData.date, 'YYYY-MM-DD').diff(moment(), 'days');
    line1.innerHTML = `<em>${dayCount} ${dayCount > 1 ? 'days' : 'day'} away</em>`;
    tripInfoContainer.appendChild(line1);
    const line2 = document.createElement('h4');
    line2.innerText = 'Weather forecast:';
    tripInfoContainer.appendChild(line2);
    const line3 = document.createElement('p');
    line3.innerHTML =`temperature high ${tripData.maxTemp}&#x2103;, low ${tripData.minTemp}&#x2103;`;
    tripInfoContainer.appendChild(line3);
    const line4 = document.createElement('p');
    line4.innerHTML = `relative humidity ${tripData.avgHumidity}&percnt;`;
    tripInfoContainer.appendChild(line4);

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove Trip';
    removeButton.setAttribute('onclick', 'Client.removeTripContainer(event)');
    tripInfoContainer.appendChild(removeButton);

    // define trip container and add to trips
    const tripContainer = document.createElement('div');
    tripContainer.setAttribute('class', 'trip-container');
    tripContainer.setAttribute('id', tripData.id);
    tripContainer.appendChild(imageContainer);
    tripContainer.appendChild(tripInfoContainer);
    return tripContainer;
}