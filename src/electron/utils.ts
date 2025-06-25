import { app, BrowserWindow } from "electron";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function handleCloseWindow(mainWindow: BrowserWindow) {
  let willClose = false;
  mainWindow.on("close", (e) => {
    if (willClose) {
      return mainWindow.close();
    }
    e.preventDefault();
    mainWindow.hide();
  });
  app.on("before-quit", () => {
    willClose = true;
  });
  mainWindow.on("show", () => {
    willClose = false;
  });
}
