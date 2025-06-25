import { Menu } from "electron";
export function createMenu(mainWindow) {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: "App",
            type: "submenu",
            submenu: [
                {
                    label: "CPU",
                    click: () => mainWindow.webContents.send("changeView", "CPU"),
                },
                {
                    label: "RAM",
                    click: () => mainWindow.webContents.send("changeView", "RAM"),
                },
                {
                    label: "STORAGE",
                    click: () => mainWindow.webContents.send("changeView", "STORAGE"),
                },
                {
                    label: "DevTools",
                    click: () => mainWindow.webContents.openDevTools(),
                },
            ],
        },
    ]));
}
