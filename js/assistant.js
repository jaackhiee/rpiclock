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

        request.get("http://api.openweathermap.org/data/2.5/weather?id=2694762&units=metric&APPID=1285b839710439fe5838914a994168bf", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }

			let data = JSON.parse(body);
			//console.log(data);
            let description = data.weather[0].main;
            let temperature = data.main.temp;
			let humidity = data.main.humidity;
			let wind = data.wind.speed;

			//$('#weather').html('<div style="display:  flex; align-items:  center;">' + Math.round(temperature) + ' &deg;C' + ", " + description.toLowerCase() + "<i class='owf owf-" + data.weather[0]['id'] + "'></i></div>");
			//$('#weather').html('<div style="display:  flex; align-items:  center;">' + "<i class='owf owf-" + data.weather[0]['id'] + "'></i>" + Math.round(temperature) + ' &deg;C' + "</div>");
            //$('#weather').html('<div style="display:  flex; align-items:  center;">' + Math.round(temperature) + ' &deg;C' + "</div>");
            $('#weather').html('');
			$('#weather').append('<div style="display:  flex; align-items:  center;">' + humidity + ' %</div>');
            $('#weather').append('<div style="display:  flex; align-items:  center;">' + wind + ' m/s</div>');
            $('#weather').append('<div style="display:  flex; align-items:  center;">' + description + ", " + Math.round(temperature) + ' &deg;C</div>');

        });
    }


    function randomQuote() {

        let quotes = [
            "Hello handsome...",
            "Hello there beautiful...",
            "You look awesome today!",
            "One day at a time.",
            "You are enough just as you are.",
            "You get what you give.",
            "Nothing is impossible. The word itself says \"I'm possible!\"",
            "Don't wait. The time will never be just right.",
            "Happiness is not by chance, but by choice.",
            "Some people look for a beautiful place. Others make a place beautiful.",
            "Life is like riding a bicycle. To keep your balance, you must keep moving.",
            "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
            "When you reach the end of your rope, tie a knot in it and hang on.",
            "Learning never exhausts the mind.",
            "Life without love is like a tree without blossoms or fruit.",
            "It is far better to be alone, than to be in bad company.",
            "If you cannot do great things, do small things in a great way.",
            "You can't blame gravity for falling in love.",
            "Honesty is the first chapter in the book of wisdom."
        ]

        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        $('#random-quote').html(randomQuote);
    }


    var bgnum = 0;

    function randomBackground() {

        let backgrounds = [
            "images/_DSC8153.jpg",
            "images/DSC_6738.jpg",
            "images/DSC_4016-noreg.jpg",
            "images/DSC_3988-1-blurred.jpg"
        ]

        let backgroundUrl = backgrounds[Math.floor(Math.random() * backgrounds.length)];

        bgnum = bgnum + 1;

        if (bgnum == backgrounds.length) {
            bgnum = 0;
        }

        $('#bg').css('background-image', 'url(' + backgrounds[bgnum] + ')');

    }


   


    // INITIAL LOAD
    getTime();
    getDate();
    serverIp();
    getExternalIp();
    serverUptime();
    getWeather();
    randomQuote();
    getRam();
    getCpuTemperature();
	getDrives();
    getPlatform();
    

    const SECONDS = 1000;
    const MINUTES = 60 * SECONDS;
    const HOURS = MINUTES * 60;
    const DAY = 24 * HOURS;




    setInterval(function() {
        getTime();
        getDate();
        serverUptime();
        getRam();
    }, SECONDS);

    setInterval(function() {
        getCpuTemperature();
        getDrives();
    }, MINUTES);

	setInterval(function() {
        getWeather();
	}, MINUTES * 30);

    setInterval(function() {
        //getWeather();
    }, HOURS);

    setInterval(function() {
        //randomBackground();
        randomQuote();
	}, DAY)



    // Handle switching between views / containers

    // Initial hide the iframe/schedule
    $('#calendar-view').hide();

    let STANDARDVIEW = true;
    
	$('body').on('click', function() {
		if (STANDARDVIEW) {
            $('#calendar-view').show();
            //const { remote } = require('electron')
            //emote.getCurrentWindow().loadURL('https://calendar.google.com/calendar/r/month')
            
            $('#standard-view').hide();
			STANDARDVIEW = false;
		} else {
            $('#backend-view').hide();
            
            $('#standard-view').show();
			STANDARDVIEW = true;
		}
    });
    
    $('iframe').on('click', function() {
        $('#calendar-view').hide();
            
        $('#standard-view').show();
    });


});
