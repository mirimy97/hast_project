import { scaleLinear, scalePoint, select, max, line } from "d3";
import { useCallback, useEffect, useMemo, useRef } from "react";
import RadarChartExample from "./WorldSidebarRadarChart";
import styles from "./WorldSidebar.module.css";

function WorldSidebarChartBox({ isDpChart }) {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div
      style={{ height: "300px", fontSize: "15px" }}
      className={styles.infobox}
    >
      {isDpChart && <RadarChartExample />}
    </div>
  );
}

export default WorldSidebarChartBox;
