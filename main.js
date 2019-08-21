const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800,
                            height: 480,
                            center: true,
                            // Inverse these for production
                            frame: true,
                            kiosk: false,
                            webPreferences: {
                              nodeIntegration: true
                            }
                          })

  // and load the index.html of the app.
  win.loadFile('index.html')

  win.on('closed', () => {
      win = null;
  })
}

app.on('ready', createWindow)





