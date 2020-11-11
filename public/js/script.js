console.log("hello");

const searchButton = document.getElementById("submitButton");
const searchCity = document.getElementById("searchCity");
const place = document.getElementById("place");
const WeatherCon = document.getElementById("WeatherCon");
const min_maxTemp = document.getElementById("min_maxTemp");
const Temperature = document.getElementById("Temperature");
const currentDate = document.getElementById("currentDate");
const currentTime = document.getElementById("currentTime");





const getWeatherReport = async (event) => {
    event.preventDefault();
    let cityVal = searchCity.value;

    if (cityVal === "") {
        place.innerHTML = "<h4 class='text-danger'>Please Enter the city Name!</h4>";
        WeatherCon.innerHTML = `<i class="fas fa-question-circle text-danger">`;
        min_maxTemp.innerText = "";
        Temperature.innerText = "";
    }
    else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=3fe4b8927de0f22838beaab7202bcd8f`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            place.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
            min_maxTemp.innerHTML = `Min-temp:${arrData[0].main.temp_min}&deg;C | Max-temp:${arrData[0].main.temp_max}&deg;C`;
            Temperature.innerHTML = `${arrData[0].main.temp}&deg;C`;
            const weather = arrData[0].weather[0].main;

            if (weather == "sunny") {
                WeatherCon.innerHTML = `<i class="fas fa-sun" style="color:#eccc68";></i>`;
            }
            else if (weather == "Clouds") {
                WeatherCon.innerHTML = `<i class="fas fa-cloud" style="color:#f1f2f6";></i>`;
            }
            else if (weather == "rain") {
                WeatherCon.innerHTML = `<i class="fas fa-cloud-rain" style="color:#a4b0be";></i>`;
            }
            else {
                WeatherCon.innerHTML = `<i class="fas fa-cloud" style="color:#44c3de";></i>`;
            }

            cityVal = "";
        }
        catch {
            cityVal = "";
            place.innerHTML = "Please Enter the city Name properly!";
            WeatherCon.innerHTML = `<i class="fas fa-exclamation-triangle text-warning">`;
            min_maxTemp.innerText = "";
            Temperature.innerText = "";
        }
    }
}
let date = new Date();
const getCurrentDate = ()=>{
    const currentDate = date.getDate();
    return currentDate;
} 

const getCurrentMonth = ()=>{
    const currentMonthCount = date.getMonth();

    const month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    const currentMonth = month[currentMonthCount-1];
    return currentMonth;
}

const getCurrentYear = () =>{
    const currentyear = date.getFullYear();
    return currentyear;
}


const getCurrentTime = () =>{
    let perios = "";
    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();

    if(currentMinutes<10)
    {
        currentMinutes = "0"+currentMinutes;
    }
    
    if(currentHours>12)
    {
        currentHours = currentHours-12;
    }

    if(date.getHours()>=12)
    {
        perios = "PM";
    }
    else{
        perios = "AM";
    }
    let result = currentHours+":"+currentMinutes+" "+perios;
    return result;
}


currentDate.innerText = getCurrentDate()+","+getCurrentMonth()+","+getCurrentYear();
currentTime.innerText = getCurrentTime();

searchButton.addEventListener('click', getWeatherReport);



