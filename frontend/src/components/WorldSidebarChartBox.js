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
        { name_en: "crime", name_ko: "범죄", value: 20 },
        { name_en: "accident", name_ko: "사고", value: 10 },
        { name_en: "disease", name_ko: "질병", value: 5 },
        { name_en: "disaster", name_ko: "재해", value: 3 },
        { name_en: "politic", name_ko: "정치", value: 8 },
      ],
    },
    {
      name: "2",
      country_tone: 20,
      world_tone: -10,
      bar: 150,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 30 },
        { name_en: "accident", name_ko: "사고", value: 15 },
        { name_en: "disease", name_ko: "질병", value: 8 },
        { name_en: "disaster", name_ko: "재해", value: 2 },
        { name_en: "politic", name_ko: "정치", value: 10 },
      ],
    },
    {
      name: "3",
      country_tone: 0,
      world_tone: 0,
      bar: 200,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 40 },
        { name_en: "accident", name_ko: "사고", value: 20 },
        { name_en: "disease", name_ko: "질병", value: 10 },
        { name_en: "disaster", name_ko: "재해", value: 1 },
        { name_en: "politic", name_ko: "정치", value: 12 },
      ],
    },
    {
      name: "4",
      country_tone: 30,
      world_tone: 60,
      bar: 180,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 36 },
        { name_en: "accident", name_ko: "사고", value: 18 },
        { name_en: "disease", name_ko: "질병", value: 9 },
        { name_en: "disaster", name_ko: "재해", value: 4 },
        { name_en: "politic", name_ko: "정치", value: 11 },
      ],
    },
    {
      name: "5",
      country_tone: -40,
      world_tone: 60,
      bar: 170,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 34 },
        { name_en: "accident", name_ko: "사고", value: 17 },
        { name_en: "disease", name_ko: "질병", value: 8 },
        { name_en: "disaster", name_ko: "재해", value: 2 },
        { name_en: "politic", name_ko: "정치", value: 10 },
      ],
    },
    {
      name: "6",
      country_tone: -70,
      world_tone: -50,
      bar: 160,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 32 },
        { name_en: "accident", name_ko: "사고", value: 16 },
        { name_en: "disease", name_ko: "질병", value: 6 },
        { name_en: "disaster", name_ko: "재해", value: 3 },
        { name_en: "politic", name_ko: "정치", value: 9 },
      ],
    },
    {
      name: "7",
      country_tone: -80,
      world_tone: -60,
      bar: 150,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 30 },
        { name_en: "accident", name_ko: "사고", value: 15 },
        { name_en: "disease", name_ko: "질병", value: 5 },
        { name_en: "disaster", name_ko: "재해", value: 4 },
        { name_en: "politic", name_ko: "정치", value: 8 },
      ],
    },
    {
      name: "8",
      country_tone: 70,
      world_tone: 30,
      bar: 140,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 28 },
        { name_en: "accident", name_ko: "사고", value: 14 },
        { name_en: "disease", name_ko: "질병", value: 4 },
        { name_en: "disaster", name_ko: "재해", value: 2 },
        { name_en: "politic", name_ko: "정치", value: 7 },
      ],
    },
    {
      name: "9",
      country_tone: 80,
      world_tone: 90,
      bar: 130,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 26 },
        { name_en: "accident", name_ko: "사고", value: 13 },
        { name_en: "disease", name_ko: "질병", value: 3 },
        { name_en: "disaster", name_ko: "재해", value: 1 },
        { name_en: "politic", name_ko: "정치", value: 6 },
      ],
    },
    {
      name: "10",
      country_tone: 20,
      world_tone: 30,
      bar: 120,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 24 },
        { name_en: "accident", name_ko: "사고", value: 12 },
        { name_en: "disease", name_ko: "질병", value: 2 },
        { name_en: "disaster", name_ko: "재해", value: 3 },
        { name_en: "politic", name_ko: "정치", value: 5 },
      ],
    },
    {
      name: "11",
      country_tone: 50,
      world_tone: 40,
      bar: 110,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 22 },
        { name_en: "accident", name_ko: "사고", value: 11 },
        { name_en: "disease", name_ko: "질병", value: 1 },
        { name_en: "disaster", name_ko: "재해", value: 2 },
        { name_en: "politic", name_ko: "정치", value: 4 },
      ],
    },
    {
      name: "12",
      country_tone: -50,
      world_tone: -20,
      bar: 100,
      pie: [
        { name_en: "crime", name_ko: "범죄", value: 20 },
        { name_en: "accident", name_ko: "사고", value: 10 },
        { name_en: "disease", name_ko: "질병", value: 4 },
        { name_en: "disaster", name_ko: "재해", value: 3 },
        { name_en: "politic", name_ko: "정치", value: 3 },
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
        {isDpChart && (
          <PieChartExample
            data={data[activeIndex]}
            month={data[activeIndex].name}
          />
        )}
      </div>
    </>
  );
}

export default WorldSidebarChartBox;
