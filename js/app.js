window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    const temperatureSpan = document.querySelector(".degree-section span");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/026e2a9152a8fa5efac30112e5ade745/${lat}, ${long}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                const { temperature, summary, icon } = data.currently;
                //Set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Formula for celsius
                let celsius = (temperature - 32) * (5/9);
                //set icon
                setIcons(icon, document.querySelector('.icon'));

                //change temperature to Celsius/Fahrenheit
                temperatureSection.addEventListener("click", () => {
                    if(temperatureSpan.textContent === "ºF"){
                        temperatureSpan.textContent = "ºC";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "ºF";
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        }); 
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});