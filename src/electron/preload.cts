import electron, { ipcRenderer } from "electron";

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistic: any) => void) => {
    electron.ipcRenderer.on("statistic", (_, data) => {
      callback({ data });
    });
    return () =>
      electron.ipcRenderer.off("statistic", (_, data) => {
        callback({ data });
      });
  },
  subscribeChangeView: (callback: (view: any) => void) => {
    electron.ipcRenderer.on("changeView", (_, data) => {
      callback({ data });
    });
    return () =>
      electron.ipcRenderer.off("changeView", (_, data) => {
        callback({ data });
      });
  },
  sendFrameAction: (payload: any) =>
    electron.ipcRenderer.send("sendFrameAction", payload),
  getStaticData: () => ipcRenderer.invoke("getStaticData"),
});
