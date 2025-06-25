import { useMemo } from "react";
import { BaseChart } from "./BaseChart";
import { COLOR_MAP } from "./Color";

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
  selectedView: "CPU" | "RAM" | "STORAGE";
};

export function Chart(props: ChartProps) {
  const color = useMemo(
    () => COLOR_MAP[props.selectedView],
    [props.selectedView]
  );
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: props.maxDataPoints - points.length }).map(
        () => ({ value: undefined })
      ),
    ];
  }, [props.data, props.maxDataPoints]);
  //   console.log("prepared data", preparedData);
  return (
    <BaseChart data={preparedData} fill={color.fill} stroke={color.stroke} />
  );
}
