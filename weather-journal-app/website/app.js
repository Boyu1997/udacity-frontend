/* Global Variables */
const localBaseUrl = "http://localhost:8000";
const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const weatherApiKey = "04444c138d8490ab802e6af6aae203f8";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// get data from url
const getData = async (url = '') => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// post data to url
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// event listener for generate
document.querySelector('#generate').addEventListener('click', () => {
    const zipcode = document.querySelector('#zip').value;
    const weatherUrl = weatherBaseUrl + "zip=" + zipcode + "&appid=" + weatherApiKey;
    getData(weatherUrl).then((data) => {
        postData(localBaseUrl + "/data", {
            temperature: data.main.temp,
            date: newDate,
            userResponse: document.querySelector('#feelings').value,
        }).then(async() => {
            const projectData = await getData(localBaseUrl + "/data");
            document.querySelector('#entryHolder').innerHTML = JSON.stringify(projectData);
        });
    });
})