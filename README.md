# RPiClock, developed in 2019
Kiosk mode clock/assistant providing date, time, weather and schedule on a Raspberry Pi. Supposed to be running with a 7" touch screen.


## npm dependencies
- electron `npm install --save electron`
- systeminformation `npm install --save systeminformation)`


## configuration
The *start_clock_kiosk.desktop* shall exist in */etc/xdg/autostart/* on the Raspberry Pi. And the *start_clock_kiosk.sh* shall be placed in *~/*.

![Sample of departures](https://raw.githubusercontent.com/jaackhiee/rpiclock/master/rpiclock-sample.jpg)
