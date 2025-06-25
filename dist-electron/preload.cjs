"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importStar(require("electron"));
electron_1.default.contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics: (callback) => {
        electron_1.default.ipcRenderer.on("statistic", (_, data) => {
            callback({ data });
        });
        return () => electron_1.default.ipcRenderer.off("statistic", (_, data) => {
            callback({ data });
        });
    },
    subscribeChangeView: (callback) => {
        electron_1.default.ipcRenderer.on("changeView", (_, data) => {
            callback({ data });
        });
        return () => electron_1.default.ipcRenderer.off("changeView", (_, data) => {
            callback({ data });
        });
    },
    sendFrameAction: (payload) => electron_1.default.ipcRenderer.send("sendFrameAction", payload),
    getStaticData: () => electron_1.ipcRenderer.invoke("getStaticData"),
});
