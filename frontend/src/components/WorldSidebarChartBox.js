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
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(country);
    axios
      .get(`https://j8e106.p.ssafy.io:8080/api/charts/${country}`)
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
            height: isMobile ? "430px" : "500px",
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
                marginBottom: isMobile ? "30px" : "50px",
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
          style={{ height: isMobile ? "250px" : "300px", fontSize: "15px" }}
          className={styles.infobox}
        >
          <PieChartExample
            data={data[activeIndex]}
            month={data[activeIndex].name}
            language={language}
            isMobile={isMobile}
          />
        </div>
      )}
    </>
  );
}

export default WorldSidebarChartBox;
