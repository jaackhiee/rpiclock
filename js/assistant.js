$(document).ready(function() {


    function getDate() {
        let days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
        let months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
        let date = new Date();
        $('#date').html(days[date.getDay()] + ', ' + date.getDate() + ' ' + months[date.getMonth()]);
    }

    
    function getTime() {
        let time = new Date();
        let h = time.getHours();
        let m = time.getMinutes();

        if (h < 10) {
            h = '0' + h;
        }

        if (m < 10) {
            m = '0' + m;
        }

        $('#time').html(h + ':' + m);
    }


    function getWeather() {
        var request = require("request");
        var fs = require("fs");

        // Load client secrets from a local file.
        const key = fs.readFileSync('weather_key.txt', 'utf-8');

        let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?id=2694762&units=metric&APPID=" + key;

        request.get(weatherUrl, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }

            let data = JSON.parse(body);
			
            let description = data.weather[0].main;
            let temperature = data.main.temp;
			let humidity = data.main.humidity;
			let wind = data.wind.speed;

			$('#weather').html('');
			$('#weather').append('<div style="display:  flex; align-items:  center;">' + humidity + ' %</div>');
            $('#weather').append('<div style="display:  flex; align-items:  center;">' + wind + ' m/s</div>');
            $('#weather').append('<div style="display:  flex; align-items:  center;">' + description + ", " + Math.round(temperature) + ' &deg;C</div>');

        });
    }




    // INITIAL LOAD
    getTime();
    getDate();
    getWeather();


    const SECONDS = 1000;
    const MINUTES = 60 * SECONDS;

    setInterval(function() {
        getTime();
    }, SECONDS);

    setInterval(function() {
        getDate();
    }, MINUTES);

	setInterval(function() {
        getWeather();
	}, MINUTES * 30);


});
