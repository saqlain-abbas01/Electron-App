import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { handleCloseWindow, isDev } from "./utils.js";
import { pollResources, getStaticData } from "./resourceManager.js";
import { getPreLoadPath } from "./pathResolver.js";
import { createMenu } from "./menu.js";
import { createTray } from "./tray.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    frame: true,
    webPreferences: {
      preload: getPreLoadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
  pollResources(mainWindow);

  ipcMain.handle("getStaticData", () => {
    return getStaticData();
  });

  ipcMain.on("sendFrameAction", (event, payload) => {
    switch (payload) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MAXIMIZE":
        mainWindow.maximize();
        break;
      case "MINIMIZE":
        mainWindow.minimize();
        break;
    }
  });
  createTray(mainWindow);
  handleCloseWindow(mainWindow);
  createMenu(mainWindow);
});
