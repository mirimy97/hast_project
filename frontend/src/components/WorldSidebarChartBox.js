import { scaleLinear, scalePoint, select, max, line } from "d3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RadarChartExample from "./WorldSidebarRadarChart";
import LineChartExample from "./WorldSidebarLineChart";
import styles from "./WorldSidebar.module.css";
import BarChartExample from "./WorldSidebarBarChart";
import PieChartExample from "./WorldSidebarPieChart";
import { useSelector } from "react-redux";
import axios from "axios";

function WorldSidebarChartBox({ isDpChart, country }) {
  // const data = [
  //   {
  //     name: "3",
  //     country_tone: 60,
  //     world_tone: 30,
  //     bar: 100,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 20 },
  //       { name_en: "accident", name_ko: "사고", value: 10 },
  //       { name_en: "disease", name_ko: "질병", value: 5 },
  //       { name_en: "disaster", name_ko: "재해", value: 3 },
  //       { name_en: "politic", name_ko: "정치", value: 8 },
  //     ],
  //   },
  //   {
  //     name: "4",
  //     country_tone: 20,
  //     world_tone: -10,
  //     bar: 150,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 30 },
  //       { name_en: "accident", name_ko: "사고", value: 15 },
  //       { name_en: "disease", name_ko: "질병", value: 8 },
  //       { name_en: "disaster", name_ko: "재해", value: 2 },
  //       { name_en: "politic", name_ko: "정치", value: 10 },
  //     ],
  //   },
  //   {
  //     name: "5",
  //     country_tone: 0,
  //     world_tone: 0,
  //     bar: 200,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 40 },
  //       { name_en: "accident", name_ko: "사고", value: 20 },
  //       { name_en: "disease", name_ko: "질병", value: 10 },
  //       { name_en: "disaster", name_ko: "재해", value: 1 },
  //       { name_en: "politic", name_ko: "정치", value: 12 },
  //     ],
  //   },
  //   {
  //     name: "6",
  //     country_tone: 30,
  //     world_tone: 60,
  //     bar: 180,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 36 },
  //       { name_en: "accident", name_ko: "사고", value: 18 },
  //       { name_en: "disease", name_ko: "질병", value: 9 },
  //       { name_en: "disaster", name_ko: "재해", value: 4 },
  //       { name_en: "politic", name_ko: "정치", value: 11 },
  //     ],
  //   },
  //   {
  //     name: "7",
  //     country_tone: -40,
  //     world_tone: 60,
  //     bar: 170,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 34 },
  //       { name_en: "accident", name_ko: "사고", value: 17 },
  //       { name_en: "disease", name_ko: "질병", value: 8 },
  //       { name_en: "disaster", name_ko: "재해", value: 2 },
  //       { name_en: "politic", name_ko: "정치", value: 10 },
  //     ],
  //   },
  //   {
  //     name: "8",
  //     country_tone: -70,
  //     world_tone: -50,
  //     bar: 160,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 32 },
  //       { name_en: "accident", name_ko: "사고", value: 16 },
  //       { name_en: "disease", name_ko: "질병", value: 6 },
  //       { name_en: "disaster", name_ko: "재해", value: 3 },
  //       { name_en: "politic", name_ko: "정치", value: 9 },
  //     ],
  //   },
  //   {
  //     name: "9",
  //     country_tone: -80,
  //     world_tone: -60,
  //     bar: 150,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 30 },
  //       { name_en: "accident", name_ko: "사고", value: 15 },
  //       { name_en: "disease", name_ko: "질병", value: 5 },
  //       { name_en: "disaster", name_ko: "재해", value: 4 },
  //       { name_en: "politic", name_ko: "정치", value: 8 },
  //     ],
  //   },
  //   {
  //     name: "10",
  //     country_tone: 70,
  //     world_tone: 30,
  //     bar: 140,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 28 },
  //       { name_en: "accident", name_ko: "사고", value: 14 },
  //       { name_en: "disease", name_ko: "질병", value: 4 },
  //       { name_en: "disaster", name_ko: "재해", value: 2 },
  //       { name_en: "politic", name_ko: "정치", value: 7 },
  //     ],
  //   },
  //   {
  //     name: "11",
  //     country_tone: 80,
  //     world_tone: 90,
  //     bar: 130,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 26 },
  //       { name_en: "accident", name_ko: "사고", value: 13 },
  //       { name_en: "disease", name_ko: "질병", value: 3 },
  //       { name_en: "disaster", name_ko: "재해", value: 1 },
  //       { name_en: "politic", name_ko: "정치", value: 6 },
  //     ],
  //   },
  //   {
  //     name: "12",
  //     country_tone: 20,
  //     world_tone: 30,
  //     bar: 120,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 24 },
  //       { name_en: "accident", name_ko: "사고", value: 12 },
  //       { name_en: "disease", name_ko: "질병", value: 2 },
  //       { name_en: "disaster", name_ko: "재해", value: 3 },
  //       { name_en: "politic", name_ko: "정치", value: 5 },
  //     ],
  //   },
  //   {
  //     name: "1",
  //     country_tone: 50,
  //     world_tone: 40,
  //     bar: 110,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 22 },
  //       { name_en: "accident", name_ko: "사고", value: 11 },
  //       { name_en: "disease", name_ko: "질병", value: 1 },
  //       { name_en: "disaster", name_ko: "재해", value: 2 },
  //       { name_en: "politic", name_ko: "정치", value: 4 },
  //       { name_en: "etc", name_ko: "기타", value: 10 },
  //     ],
  //   },
  //   {
  //     name: "2",
  //     country_tone: -50,
  //     world_tone: -20,
  //     bar: 100,
  //     pie: [
  //       { name_en: "crime", name_ko: "범죄", value: 20 },
  //       { name_en: "accident", name_ko: "사고", value: 10 },
  //       { name_en: "disease", name_ko: "질병", value: 4 },
  //       { name_en: "disaster", name_ko: "재해", value: 3 },
  //       { name_en: "politic", name_ko: "정치", value: 3 },
  //       { name_en: "etc", name_ko: "기타", value: 40 },
  //     ],
  //   },
  // ];
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(country);
    axios
      .get(`http://j8e106.p.ssafy.io:8080/api/charts/${country}`)
      .then((res) => setData(res.data.result));
  }, []);

  const [activeIndex, setActiveIndex] = useState(11);
  const isMobile = useSelector((state) => state.status.isMobile);
  const language = useSelector((state) => state.language.value);

  useEffect(() => {
    console.log(activeIndex);
  }, [activeIndex]);
  return (
    <>
      {data.length > 0 && isDpChart > 0 && (
        <div
          style={{
            height: "500px",
            fontSize: "15px",
            display: "flex",
            flexDirection: "column",
          }}
          className={styles.infobox}
        >
          <p
            className={styles.chartTitle}
            style={{ fontSize: isMobile ? "15px" : "23px" }}
          >
            {language === "ko" ? "이 나라의 분위기는?" : "How's the mood here?"}
          </p>
          {language === "ko" ? (
            <p
              className={styles.chartContent}
              style={{
                marginBottom: "50px",
                fontSize: isMobile ? "12px" : "15px",
              }}
            >
              <span style={{ color: "#28678f" }}>톤(Tone)</span> 이란
              무엇일까요? <br />각 사건의{" "}
              <span style={{ color: "#2e7d50" }}>긍정</span>,{" "}
              <span style={{ color: "#b33936" }}>부정</span> 정도의 평균값으로{" "}
              <br />
              해당 지역의 분위기를 유추할 수 있어요.
            </p>
          ) : (
            <p
              className={styles.chartContent}
              style={{
                marginBottom: "30px",
                fontSize: isMobile ? "12px" : "15px",
              }}
            >
              What is
              <span style={{ color: "#28678f" }}> Tone</span>? <br />
              The atmosphere of the area can be inferred by the
              <span style={{ color: "#2e7d50" }}> positive</span> and
              <span style={{ color: "#b33936" }}> negative</span> levels of each
              event.
            </p>
          )}
          <LineChartExample data={data} language={language} />
        </div>
      )}
      {data.length > 0 && isDpChart > 1 && (
        <div
          style={{
            height: "400px",
            fontSize: "15px",
            display: "flex",
            flexDirection: "column",
          }}
          className={styles.infobox}
        >
          <p
            className={styles.chartTitle}
            style={{ fontSize: isMobile ? "15px" : "23px" }}
          >
            {language === "ko"
              ? "어떤 일이 일어나고 있을까요?"
              : "What event is taking place?"}
          </p>
          {language === "ko" ? (
            <p
              className={styles.chartContent}
              style={{
                marginBottom: "30px",
                fontSize: isMobile ? "12px" : "15px",
              }}
            >
              아래 차트는 <span style={{ color: "#28678f" }}>월별 사건 수</span>
              를 나타내요.
              <br />
              그래프를 클릭해서 어떤 사건이 많이 일어났는지 자세히 알아보세요.
            </p>
          ) : (
            <p
              className={styles.chartContent}
              style={{
                marginBottom: "30px",
                fontSize: isMobile ? "12px" : "15px",
              }}
            >
              The chart below shows{" "}
              <span style={{ color: "#28678f" }}>
                the number of events per month
              </span>
              . Click on the graph to see which events happened the most
            </p>
          )}

          <BarChartExample
            data={data}
            setActiveIndex={setActiveIndex}
            language={language}
          />
        </div>
      )}
      {data.length > 0 && isDpChart > 2 && (
        <div
          style={{ height: "300px", fontSize: "15px" }}
          className={styles.infobox}
        >
          <PieChartExample
            data={data[activeIndex]}
            month={data[activeIndex].name}
            language={language}
          />
        </div>
      )}
    </>
  );
}

export default WorldSidebarChartBox;
