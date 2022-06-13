const {app, BrowserWindow, Menu, shell } = require('electron');
const path = require("path");

const menuItem = [
    {
        label: "Menu",
        submenu :[
            {
                label: "About"
            }
        ]
    },
    {
        label: "File",
        submenu :[
            {
                label: "Learn More",
                click: async () => {
                    await shell.openExternal('https://electronjs.org')
                  }
            },
            {
                type: "separator"
            },
            {
                label: "New Window",
                click: () => {
                    const win2 = new BrowserWindow(
                        {
                            height: 300,
                            width: 400,
                            show: false,
                            backgroundColor: "#343434"
                        }
                    );

                    win2.webContents.openDevTools();
                    win2.loadURL("https://www.quran.com");
                    win2.once('ready-to-show', () => {
                        win2.show();
                    })
                }
            },
            {
                label: "Open Camera",
                click: async () => {
                        const win3 = new BrowserWindow({
                                height: 300,
                                width: 400
                        });

                        win3.webContents.openDevTools();
                        win3.loadFile("camera.html");
                        win3.on('ready-to-show', () => {
                            win3.show();
                        })
                }
            },
            {
                type: "separator"
            },
            {
                label: "Exit",
                click: () => {
                    app.quit()
                }
            },
        
        ]
    },
    {
        label: "Window",
        submenu :[
            {
                role: "close"
            }
        ]
    },
];

const menu = Menu.buildFromTemplate(menuItem);
Menu.setApplicationMenu(menu);

const createWindow = () => {
    const win = new BrowserWindow({
            height: 500,
            width: 800,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
            }
        }
    );

    win.loadFile("index.html");
};

app.whenReady().then( () => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
