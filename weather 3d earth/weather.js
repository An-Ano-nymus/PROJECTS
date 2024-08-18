var map;
      function init() {
        map = WE.map('map', {
          center: [36.057944835, -112.18688965],
          zoom: 3,
          dragging: true,
          scrollWheelZoom: true
        });

        var baselayer = WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
          tileSize: 256,
          bounds: [[-85, -180], [85, 180]],
          minZoom: 0,
          maxZoom: 16,
          attribution: 'WebGLEarth example',
          tms: true
        }).addTo(map);

        //Add TileJSON layer
        var json = {"profile": "mercator", "name": "Grand Canyon USGS", "format": "png", "bounds": [-112.26379395, 35.98245136, -112.10998535, 36.13343831], "minzoom": 10, "version": "1.0.0", "maxzoom": 16, "center": [-112.18688965, 36.057944835, 13], "type": "overlay", "description": "", "basename": "grandcanyon", "tilejson": "2.0.0", "sheme": "xyz", "tiles": ["http://tileserver.maptiler.com/grandcanyon/{z}/{x}/{y}.png"]};
        var grandcanyon = WE.tileLayerJSON(json);
        grandcanyon.addTo(map);

        grandcanyon.setOpacity(0.7);
        document.getElementById('opacity2').addEventListener('change', function(e) {
          grandcanyon.setOpacity(e.target.value);
        });
        WE.marker([json.center[1], json.center[0]]).addTo(map);


        //Print coordinates of the mouse
        map.on('mousemove', function(e) {
          document.getElementById('coords').innerHTML = e.latlng.lat + ', ' + e.latlng.lng;
        });

        map.on('dblclick',function(e){

          
            
            

            var marker = WE.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

            console.log(e.latlng.lat + ', ' + e.latlng.lng)

            WEATHER_FORECAST_BOX_CREATE(e.latlng.lat,e.latlng.lng)

            marker.bindPopup(`<span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..<b>Hello world!</b></span>`, {maxWidth: 120, closeButton: true});


        });


      }

      function addSomeMarkers() {
        document.getElementById('addmarkers').disabled = true;

        map.setView([51.505, 0], 5);
        var marker = WE.marker([51.5, -0.09]).addTo(map);
        marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();

        var marker2 = WE.marker([30.058056, 31.228889]).addTo(map);
        marker2.bindPopup("<b>Cairo</b><br>Yay, you found me!<br />Here, enjoy another polygon..", {maxWidth: 120, closeButton: false});

        var polygonA = WE.polygon([[50, 1], [51, 0.5], [50.5, 2.5]]).addTo(map);
        var polygonB = WE.polygon([[50, 3], [51, 2.5], [50.5, 4.5]], {
          color: '#ff0',
          opacity: 1,
          fillColor: '#f00',
          fillOpacity: 0.1,
          weight: 2
        }).addTo(map);

        var anotherPolygon = function(e) {
          WE.polygon([[30, 30], [29, 31], [30, 32], [32, 32], [31, 30]], {
            color: '#000',
            opacity: 1,
            fillColor: '#0f0',
            fillOpacity: 0.7,
            weight: 2
          }).addTo(map);
          marker2.off('click', anotherPolygon);
        };
        marker2.on('click', anotherPolygon);
      }

      function setZoom(zoom) {
        map.setZoom(zoom);
      }

      function getZoomLevel() {
        alert('Current zoom is: ' + Math.round(map.getZoom()));
      }

      function setPositionToEverest() {
        map.setView([27.988056, 86.925278]);
      }

      function getCurrentCenter() {
        alert(map.getCenter());
      }

      function flyToJapan() {
        map.fitBounds([[22, 122], [48, 154]]);
        map.panInsideBounds([[22, 122], [48, 154]],
                {heading: 90, tilt: 25, duration: 1});
      }

      function panTo(coords) {
        map.panTo(coords);
      }















const API_KEY = "168771779c71f3d64106d8a88376808a";







// function mouseMarkersOnClick() {

//   document.getElementById('addmarkers').disabled = true;

  


//   map.setView([e.latlng.lat, e.latlng.lng], 4);

//   var marker = WE.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

//   console.log(e.latlng.lat + ', ' + e.latlng.lng)

//   marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();

//   var marker2 = WE.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//   marker2.bindPopup("<b>Cairo</b><br>Yay, you found me!<br />Here, enjoy another polygon..", {maxWidth: 120, closeButton: false});
  
  
// }




async function fetchWeatherInfo(weatherContentDiv,latitude,longitude) {
  const { lat, lng } = getCoordinates(latitude,longitude); // Replace with the actual implementation to get coordinates

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Clear placeholder text before rendering new data
    weatherContentDiv.textContent = ''; 
    renderWeatherInfo(data, weatherContentDiv);
    
  } catch (err) {
    console.error("Error:", err);
    weatherContentDiv.textContent = 'Error fetching weather data. Please try again later.';
  }
}

function renderWeatherInfo(data, weatherContentDiv) {
  // Check if necessary data exists before rendering
  if (!data || !data.name || !data.sys || !data.weather || !data.main || !data.wind || !data.clouds) {
    console.error('Missing weather data in API response. Check API endpoint and data structure.');
    weatherContentDiv.textContent = 'Incomplete weather data received.';
    return;
  }

  // Create elements to display weather information
  const cityName = document.createElement('p');
  cityName.innerHTML = `<strong>City:</strong> ${data.name}`;

  const countryFlag = document.createElement('img');
  countryFlag.src = `https://flagcdn.com/144x108/${data.sys.country.toLowerCase()}.png`;
  countryFlag.alt = 'Country flag';

  const description = document.createElement('p');
  description.innerHTML = `<strong>Description:</strong> ${data.weather[0].description}`;

  const weatherIcon = document.createElement('img');
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.alt = 'Weather icon';

  const temp = document.createElement('p');
  temp.innerHTML = `<strong>Temperature:</strong> ${data.main.temp.toFixed(2)} °C`;

  const windspeed = document.createElement('p');
  windspeed.innerHTML = `<strong>Wind Speed:</strong> ${data.wind.speed.toFixed(2)} m/s`;

  const humidity = document.createElement('p');
  humidity.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity} %`;

  const clouds = document.createElement('p');
  clouds.innerHTML = `<strong>Cloudiness:</strong> ${data.clouds.all} %`;

  // Append all elements to the weatherContentDiv
  weatherContentDiv.appendChild(cityName);
  weatherContentDiv.appendChild(countryFlag);
  weatherContentDiv.appendChild(description);
  weatherContentDiv.appendChild(weatherIcon);
  weatherContentDiv.appendChild(temp);
  weatherContentDiv.appendChild(windspeed);
  weatherContentDiv.appendChild(humidity);
  weatherContentDiv.appendChild(clouds);
}

function WEATHER_FORECAST_BOX_CREATE(latitude,longitude) {
  // Create the main div element
  const weatherForecastBox = document.createElement('div');
  weatherForecastBox.classList.add('weather-forecast-box');

  // Create the close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', () => {
    weatherForecastBox.remove();
  });

  // Add content placeholder to weatherContent div
  const weatherContent = document.createElement('div');
  weatherContent.classList.add('weather-content');
  weatherContent.textContent = 'Loading weather data...'; // Initial placeholder text

  // Append elements to the weather forecast box
  weatherForecastBox.appendChild(closeButton);
  weatherForecastBox.appendChild(weatherContent);

  // Append the weather forecast box to the body
  document.body.appendChild(weatherForecastBox);

  // Call fetchWeatherInfo to populate content asynchronously
  fetchWeatherInfo(weatherContent,latitude,longitude); // Pass the weatherContent div as an argument
}

function getCoordinates(latitude,longitude) {
  // Replace this with actual logic to retrieve coordinates
  return { lat: latitude.toFixed(4), lng: longitude.toFixed(4) }; // Example: New York City coordinates
}

// Example usage:
document.getElementById('showWeatherButton').addEventListener('click', WEATHER_FORECAST_BOX_CREATE);











function cityName() {
  // Get the input value
  const cityName = document.getElementById("PROMPT").value;

  // Do something with the input value
  console.log("You entered: " + cityName);
  return cityName;
}

async function show_Weather_using_city(weatherContentDiv, cityName) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();
    
    panTo([data.coord.lat, data.coord.lon])

    // Clear placeholder text before rendering new data
    weatherContentDiv.textContent = ''; 
    setTimeout(renderWeatherInfoForCity(data, weatherContentDiv),5000);
    
  } catch (err) {
    console.error("Error:", err);
    weatherContentDiv.textContent = 'Error fetching weather data. Please try again later.';
  }
}

function WEATHER_FORECAST_BOX_CREATE_FOR_CITY_NAME() {
  const cityname = cityName();  // Correctly call the cityName function

  if (!cityname) {  // Check if city name is not empty
    alert('Please enter a city name.');
    return;
  }

  // Create the main div element
  const weatherForecastBox = document.createElement('div');
  weatherForecastBox.classList.add('weather-forecast-box');

  // Create the close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', () => {
    weatherForecastBox.remove();
  });

  // Add content placeholder to weatherContent div
  const weatherContent = document.createElement('div');
  weatherContent.classList.add('weather-content');
  weatherContent.textContent = 'Loading weather data...'; // Initial placeholder text

  // Append elements to the weather forecast box
  weatherForecastBox.appendChild(closeButton);
  weatherForecastBox.appendChild(weatherContent);

  // Append the weather forecast box to the body
  document.body.appendChild(weatherForecastBox);

  // Call fetchWeatherInfo to populate content asynchronously
  show_Weather_using_city(weatherContent, cityname); // Pass the weatherContent div as an argument
}

function renderWeatherInfoForCity(data, weatherContentDiv) {
  // Check if necessary data exists before rendering
  if (!data || !data.name || !data.sys || !data.weather || !data.main || !data.wind || !data.clouds) {
    console.error('Missing weather data in API response. Check API endpoint and data structure.');
    weatherContentDiv.textContent = 'Incomplete weather data received.';
    return;
  }


  

  


  // Create elements to display weather information
  const cityNameElem = document.createElement('p');
  cityNameElem.innerHTML = `<strong>City:</strong> ${data.name}`;

  const countryFlag = document.createElement('img');
  countryFlag.src = `https://flagcdn.com/144x108/${data.sys.country.toLowerCase()}.png`;
  countryFlag.alt = 'Country flag';


  const description = document.createElement('p');
  description.innerHTML = `<strong>Description:</strong> ${data.weather[0].description}`;

  const weatherIcon = document.createElement('img');
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.alt = 'Weather icon';

  const temp = document.createElement('p');
  temp.innerHTML = `<strong>Temperature:</strong> ${data.main.temp.toFixed(2)} °C`;

  const windspeed = document.createElement('p');
  windspeed.innerHTML = `<strong>Wind Speed:</strong> ${data.wind.speed.toFixed(2)} Km/h`;

  const humidity = document.createElement('p');
  humidity.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity} %`;

  const clouds = document.createElement('p');
  clouds.innerHTML = `<strong>Cloudiness:</strong> ${data.clouds.all} %`;

  // Append all elements to the weatherContentDiv
  weatherContentDiv.appendChild(cityNameElem);
  weatherContentDiv.appendChild(countryFlag);
  weatherContentDiv.appendChild(description);
  weatherContentDiv.appendChild(weatherIcon);
  weatherContentDiv.appendChild(temp);
  weatherContentDiv.appendChild(windspeed);
  weatherContentDiv.appendChild(humidity);
  weatherContentDiv.appendChild(clouds);
}



function showPosition(position) {

  panTo([position.coords.latitude,position.coords.longitude])
  
  

  var marker = WE.marker([position.coords.latitude,position.coords.longitude]).addTo(map);

  WEATHER_FORECAST_BOX_CREATE( position.coords.latitude,position.coords.longitude)

}



function getCurrentWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

}

