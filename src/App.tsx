import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useStatistics } from "./useStatistic";
import type { StaticData, View } from "./types";
import { Chart } from "./Chart";
import { FiX, FiMinus, FiMaximize } from "react-icons/fi";

function App() {
  const staticData = useStaticData();
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>("CPU");
  console.log("active view", activeView);
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.data.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.data.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.data.storageUsage),
    [statistics]
  );

  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => {
      console.log("updated view", view);
      setActiveView(view.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main">
        <div>
          <SelectOption
            onClick={() => setActiveView("CPU")}
            title="CPU"
            view="CPU"
            subTitle={staticData?.cpuModel ?? ""}
            data={cpuUsages}
          />
          <SelectOption
            onClick={() => setActiveView("RAM")}
            title="RAM"
            view="RAM"
            subTitle={(staticData?.totalMemoryGB.toString() ?? "") + " GB"}
            data={ramUsages}
          />
          <SelectOption
            onClick={() => setActiveView("STORAGE")}
            title="STORAGE"
            view="STORAGE"
            subTitle={(staticData?.totalStorage.toString() ?? "") + " GB"}
            data={storageUsages}
          />
        </div>
        <div className="mainGrid">
          <Chart
            selectedView={activeView}
            data={activeUsages}
            maxDataPoints={10}
          />
        </div>
      </div>
    </div>
  );
}

function SelectOption(props: {
  title: string;
  view: View;
  subTitle: string;
  data: number[];
  onClick: () => void;
}) {
  return (
    <button className="selectOption" onClick={props.onClick}>
      <div className="selectOptionTitle">
        <div>{props.title}</div>
        <div>{props.subTitle}</div>
      </div>
      <div className="selectOptionChart">
        <Chart selectedView={props.view} data={props.data} maxDataPoints={10} />
      </div>
    </button>
  );
}

function Header() {
  return (
    <header className="header">
      <button
        id="close"
        className="button"
        onClick={() => window.electron.sendFrameAction("CLOSE")}
      >
        <FiX />
      </button>
      <button
        id="minimize"
        className="button"
        onClick={() => window.electron.sendFrameAction("MINIMIZE")}
      >
        <FiMinus />
      </button>
      <button
        id="maximize"
        className="button"
        onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
      >
        <FiMaximize />
      </button>
    </header>
  );
}

function useStaticData() {
  const [staticData, setStaticData] = useState<StaticData | null>(null);

  useEffect(() => {
    (async () => {
      setStaticData(await window.electron.getStaticData());
    })();
  }, []);

  return staticData;
}

export default App;
