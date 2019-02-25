# Made with <3 by Jakob Hansson, 2019
# This is to be executed from /etc/xdg/autostart/start_clock_kiosk.desktop on a RPi 3 B+

#sleep 5

# Enable unclutter (hides the mouse when idle for 5 seconds
unclutter -idle 1 &

# Start my Electron application
cd /home/pi/raspberrypi-home-server/
npm start &
