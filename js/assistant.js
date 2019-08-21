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


    function serverIp() {
    let os = require('os');
    let interfaces = os.networkInterfaces();
    for (let k in interfaces) {
        for (let k2 in interfaces[k]) {
            let address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                $('#lan').html("Lan - " + address.address);
            }
        }
    }
    }

    function getExternalIp() {
        var request = require("request");

        request.get("http://httpbin.org/ip", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }

            $('#wan').html("Wan - " + JSON.parse(body)['origin']);
        });
    }

    function serverUptime() {
        let date = new Date(null);
        let os = require('os');
        date.setSeconds(os.uptime());
        let uptime = date.toISOString().substr(11, 8);

        $('#uptime').html("Uptime - " + uptime);
    }

    function humanFileSize(bytes, si) {
        var thresh = si ? 1000 : 1024;
        if(Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = si
            ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
            : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while(Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1)+' '+units[u];
    }

    function getRam() {
        const si = require('systeminformation');

        si.mem(function(data) {
            $('#ram').html("Memory - " + humanFileSize(data.total - data.available, false) + " / " + humanFileSize(data.total, false));
        });
    }

    function getCpuTemperature() {
        const si = require('systeminformation');
        si.cpuTemperature(function(data) {
            $('#cputemp').html("Temperature - " + data.main + "&deg;C");
        });
    }

    function getDrives() {
        const si = require('systeminformation');


        si.fsSize(function(data) {
            $('#disks').html('');
            for (let i = 0; i < data.length; i++) {
                /* Regex to filter out /dev/loop*, ubuntu crap */
                let match = data[i].fs.match(/\/dev\/loop[0-9]+$/);
                if (data[i].fs != match) {
					$('#disks').append('<div class="text-small" style="display: flex; justify-content: flex-end;">'
										+ data[i].fs + " - " + data[i].type + " - "
										+ humanFileSize(data[i].used, false)
										+ " / "
										+ humanFileSize(data[i].size, false)
										+ "<div>");
                }
            }
        });
	}

	function getPlatform() {
		const os = require('os');
		$('#architecture').html('Architecture - ' + os.type() + ' - ' + os.arch()
								+ '<br>Kernel - ' + os.release());

	}


    function getWeather() {
        var request = require("request");
        var fs = require("fs");
        var key;

        // Load client secrets from a local file.
        fs.readFile('weather_key.txt', 'utf-8',(err, content) => {
            if (err) return console.log('Error loading weather_api.json file:', err);
            key = content;
        });



        let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?id=2694762&units=metric&APPID=" + key;

        request.get(weatherUrl, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }

			let data = JSON.parse(body);
			console.log(data);
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
