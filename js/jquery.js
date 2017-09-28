$(document).ready(function(){
  //retrieve our location info
  let locationData = $.get('https://ipapi.co/json/');
  //Make sure to declare variables to store data


  locationData.then(function(response, status){
    // Declare location variables (lat, lon, city, state) then activate api call
    console.log(response);
    let city = response.city;
    let lat = response.latitude;
    let lon = response.longitude;
    let state = response.region;
    getWeatherData(lat, lon, city, state);


  });

  function getWeatherData(lat, lon, city, state) {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?';
    var apiKEY = '05cda9d059e3f35511f0ca2cb1772062';
    var weatherData = $.getJSON(`${weatherAPI}lat=${lat}&lon=${lon}&APPID=${apiKEY}`);

    weatherData.then(function(response, status){
      // Insert your data into the html! hint: log the api response and see what data is available.
      let temp = response.main.temp * (9/5) - 459.67;
      let icon = response.weather[0].icon;
      let weatherStatus = response.weather[0].description;
      let tempFarenheit = temp.toFixed(2);
      let windSpeed = response.wind.speed;
      let windDeg = response.wind.deg;
      //  switch(dir){
      //   case ((windDeg > 0 && windDeg < 22.5) || (windDeg < 360 && windDeg > 337.5) ):
      //     let windDegDir = 'N';
      //     break;
      // }

      let weatherStatusArray = weatherStatus.split(' ');
      console.log(weatherStatusArray);

      for (i = 0; i < weatherStatusArray.length; i++) {
        let weatherStatusCapArray = weatherStatusArray[i].charAt(0).toUpperCase() + weatherStatusArray[i].slice(1);



        let weatherStatusCapitalized = weatherStatusCapArray.toString();
        // console.log(weatherStatusCapitalized);
          // for (i = 0; i < weatherStatusCapArray.length; i++) {
          //   let weatherStatusCapitalized = weatherstatusCapArray[i];
          // }
        $('#weatherIcon').append(`<h1 id="statusDescription" class="current-status"> ${weatherStatusCapitalized}</h1>`);
      }

      console.log(windSpeed);
      console.log(windDeg);
      console.log(response);
      console.log(tempFarenheit);
      console.log(icon);

      $('#city').html(`${city}, ${state}`);
      $('#coOrdinates').html(`Latitude: ${lat} Longitude: ${lon}`);
      $('#temperature').html(`${tempFarenheit} &#8457`);
      $('#weatherIcon').append(`<img id="icon" class="weather-icon" src="http://openweathermap.org/img/w/${icon}.png" />`);
      $('#wind').html(`${windSpeed} MPH ${windDeg}`);
    });
   }
});
