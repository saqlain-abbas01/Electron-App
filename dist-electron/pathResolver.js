import { app } from "electron";
import path from "path";
import { isDev } from "./utils.js";
export function getPreLoadPath() {
    return path.join(app.getAppPath(), isDev() ? "." : "..", "/dist-electron/preload.cjs");
}
export function getAssestPath() {
    return path.join(app.getAppPath(), isDev() ? "." : "..", "/src/assets");
}
