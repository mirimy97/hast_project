import { scaleLinear, scalePoint, select, max, line } from "d3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RadarChartExample from "./WorldSidebarRadarChart";
import LineChartExample from "./WorldSidebarLineChart";
import styles from "./WorldSidebar.module.css";
import BarChartExample from "./WorldSidebarBarChart";
import PieChartExample from "./WorldSidebarPieChart";

function WorldSidebarChartBox({ isDpChart }) {
  const data = [
    {
      name: "1",
      country_tone: 60,
      world_tone: 30,
      bar: 100,
      pie: [
        { name_en: "crime", value: 20 },
        { name_en: "accident", value: 10 },
        { name_en: "disease", value: 5 },
        { name_en: "disaster", value: 3 },
        { name_en: "politic", value: 8 },
      ],
    },
    {
      name: "2",
      country_tone: 20,
      world_tone: -10,
      bar: 150,
      pie: [
        { name: "crime", value: 30 },
        { name: "accident", value: 15 },
        { name: "disease", value: 8 },
        { name: "disaster", value: 2 },
        { name: "politic", value: 10 },
      ],
    },
    {
      name: "3",
      country_tone: 0,
      world_tone: 0,
      bar: 200,
      pie: [
        { name: "crime", value: 40 },
        { name: "accident", value: 20 },
        { name: "disease", value: 10 },
        { name: "disaster", value: 1 },
        { name: "politic", value: 12 },
      ],
    },
    {
      name: "4",
      country_tone: 30,
      world_tone: 60,
      bar: 180,
      pie: [
        { name: "crime", value: 36 },
        { name: "accident", value: 18 },
        { name: "disease", value: 9 },
        { name: "disaster", value: 4 },
        { name: "politic", value: 11 },
      ],
    },
    {
      name: "5",
      country_tone: 30,
      world_tone: 60,
      bar: 170,
      pie: [
        { name: "crime", value: 34 },
        { name: "accident", value: 17 },
        { name: "disease", value: 8 },
        { name: "disaster", value: 2 },
        { name: "politic", value: 10 },
      ],
    },
    {
      name: "6",
      country_tone: 80,
      world_tone: -50,
      bar: 160,
      pie: [
        { name: "crime", value: 32 },
        { name: "accident", value: 16 },
        { name: "disease", value: 6 },
        { name: "disaster", value: 3 },
        { name: "politic", value: 9 },
      ],
    },
    {
      name: "7",
      country_tone: 60,
      world_tone: -60,
      bar: 150,
      pie: [
        { name: "crime", value: 30 },
        { name: "accident", value: 15 },
        { name: "disease", value: 5 },
        { name: "disaster", value: 4 },
        { name: "politic", value: 8 },
      ],
    },
    {
      name: "8",
      country_tone: 70,
      world_tone: 30,
      bar: 140,
      pie: [
        { name: "crime", value: 28 },
        { name: "accident", value: 14 },
        { name: "disease", value: 4 },
        { name: "disaster", value: 2 },
        { name: "politic", value: 7 },
      ],
    },
    {
      name: "9",
      country_tone: 80,
      world_tone: 90,
      bar: 130,
      pie: [
        { name: "crime", value: 26 },
        { name: "accident", value: 13 },
        { name: "disease", value: 3 },
        { name: "disaster", value: 1 },
        { name: "politic", value: 6 },
      ],
    },
    {
      name: "10",
      country_tone: 20,
      world_tone: 30,
      bar: 120,
      pie: [
        { name: "crime", value: 24 },
        { name: "accident", value: 12 },
        { name: "disease", value: 2 },
        { name: "disaster", value: 3 },
        { name: "politic", value: 5 },
      ],
    },
    {
      name: "11",
      country_tone: 50,
      world_tone: 40,
      bar: 110,
      pie: [
        { name: "crime", value: 22 },
        { name: "accident", value: 11 },
        { name: "disease", value: 1 },
        { name: "disaster", value: 2 },
        { name: "politic", value: 4 },
      ],
    },
    {
      name: "12",
      country_tone: -50,
      world_tone: -20,
      bar: 100,
      pie: [
        { name: "crime", value: 20 },
        { name: "accident", value: 10 },
        { name: "disease", value: 4 },
        { name: "disaster", value: 3 },
        { name: "politic", value: 3 },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log(activeIndex);
  }, [activeIndex]);
  return (
    <>
      <div
        style={{ height: "300px", fontSize: "15px" }}
        className={styles.infobox}
      >
        {isDpChart && <LineChartExample data={data} />}
      </div>
      <div
        style={{ height: "300px", fontSize: "15px" }}
        className={styles.infobox}
      >
        {isDpChart && (
          <BarChartExample data={data} setActiveIndex={setActiveIndex} />
        )}
      </div>
      <div
        style={{ height: "300px", fontSize: "15px" }}
        className={styles.infobox}
      >
        {isDpChart && <PieChartExample data={data} activeIndex={activeIndex} />}
      </div>
    </>
  );
}

export default WorldSidebarChartBox;
