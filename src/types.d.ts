export {};

type UnsubscribeFunction = () => void;

declare global {
  interface Window {
    electron: {
      subscribeStatistics: (
        callback: (statistics: Statistics) => void
      ) => UnsubscribeFunction;
      getStaticData: () => Promise<StaticData>;
      subscribeChangeView: (
        callback: (view: { data: View }) => void
      ) => UnsubscribeFunction;
      sendFrameAction: (payload: unknown) => void;
    };
  }
}

export type Statistics = {
  data: {
    cpuUsage: number;
    ramUsage: number;
    storageUsage: number;
  };
};

export type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

export type View = "CPU" | "RAM" | "STORAGE";
