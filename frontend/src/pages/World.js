import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import * as d3 from "d3";
import * as chromatic from "d3-scale-chromatic";
import Globe from "react-globe.gl";
import PointMarker from "react-globe.gl";
import axios from "axios";
import styles from "./World.module.css";

import WorldSidebar from "../components/WorldSidebar";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { setIsLogo } from "../redux/status";
import { colors } from "@mui/material";
import { interpolateRgb } from "d3-interpolate";
import { motion } from "framer-motion";

function World() {
  const dispatch = useDispatch();
  const globeRef = useRef();
  const sidebarRef = useRef(null);
  const isMobile = useSelector((state) => state.status.isMobile);
  const isLogo = useSelector((state) => state.status.isLogo);
  // const [isLoading, setIsLoading] = useState(true);
  const [ani, setAni] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [left, setLeft] = useState(-250);
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [clickD, setClickD] = useState(null);
  const [sidebarC, setSidebarC] = useState(null);
  const [point, setPoint] = useState(
    isLogo
      ? {
          lat: 0,
          lng: 0,
          altitude: 50,
        }
      : {
          lat: 0,
          lng: 0,
          altitude: 2.5,
        }
  );
  const [sidebarD, setSidebarD] = useState(-500);
  const [sidebarMbottom, setSidebarMbottom] = useState("-100vh");
  const [isDpChart, setIsDpChart] = useState(0);

  // 브라우저 창 크기 변화 이벤트 -> globe 리사이징
  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // 스크롤 이벤트 -> 차트 나타내기 효과
  const displayChart = () => {
    console.log("scroll", sidebarRef.current.scrollTop);
    // console.log(isDpChart);
    if (isMobile) {
      if (sidebarRef.current.scrollTop > 140) {
        setIsDpChart(1);
      }
      if (sidebarRef.current.scrollTop > 430) {
        setIsDpChart(2);
      }
      if (sidebarRef.current.scrollTop > 750) {
        setIsDpChart(3);
      }
    } else if (!isMobile) {
      if (sidebarRef.current.scrollTop > 1) {
        setIsDpChart(1);
      }
      if (sidebarRef.current.scrollTop > 600) {
        setIsDpChart(2);
      }
      if (sidebarRef.current.scrollTop > 1050) {
        setIsDpChart(3);
      }
    }
  };
  useEffect(() => {
    //console.log("isDpChart", isDpChart);
    //console.log("sidebar", sidebarRef);
    sidebarRef.current.addEventListener("scroll", displayChart);
    return () => {
      if (sidebarRef.current) {
        sidebarRef.current.removeEventListener("scroll", displayChart);
      }
    };
  }, [isDpChart, sidebarRef]);

  //redux- language 불러오기
  const language = useSelector((state) => state.language.value);

  //geoJSON 불러오는 코드
  // const getGeoJson = useMemo(() => {
  //   return axios
  //     .fetch("geojson/ne_110m_admin_0_countries.geojson")
  //     .then((res) => res.data);
  // }, []);
  // useEffect(() => {
  //   // call async function
  //   getGeoJson.then((data) => setCountries(data));
  // }, [getGeoJson]);
  const [additionalData, setAdditionalData] = useState({ features: [] });
  useEffect(() => {
    // load data
    fetch("geojson/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then(setCountries);

    // load additional data
    axios.get("http://j8e106.p.ssafy.io:8080/api/scores").then((res) => {
      const data = res.data.result;
      // join additional data with GeoJSON data
      setAdditionalData(data);
      setCountries((prevCountries) => ({
        type: prevCountries.type,
        features: prevCountries.features.map((feat) => {
          //console.log(feat);
          const match = data.find(
            (d) => d.countryCode === feat.properties.FIPS_10_
          );
          //console.log("match", match);
          return match
            ? {
                ...feat,
                properties: { ...feat.properties, score: match.score },
              }
            : feat;
        }),
      }));
    });

    //logo
    setTimeout(() => {
      //setAni(true);
      setPoint({
        lat: 0,
        lng: 0,
        altitude: 2.5,
      });
    }, 500);
    // setTimeout(() => {
    //   dispatch(setIsLogo(false));
    // }, 1000);

    console.log(countries);
  }, []);

  //나라별 스코어

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat) => {
    //console.log(
    //  "GDP",
    //feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
    //);
    //console.log(feat.properties);
    const val = feat.properties.score / 100;
    return isNaN(val) ? 0.1 : val;
  };
  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  // const colorScale = d3.scaleSequential((t) =>
  //   d3.interpolateBuPu(t * 0.8 + 0.1)
  // );
  const colorScale = d3.scaleSequential((t) => {
    const c = d3.color(d3.interpolateRdYlGn(1 - t));
    //console.log(t);
    return `rgba(${c.r}, ${c.g}, ${c.b}, 0.5)`;
  });
  // ${t * 0.9 + 0.1}
  colorScale.domain([0, maxVal]);

  //국기 불러오는 api
  const flagEndpoint = "/assets/flags";

  // 클릭시 카메라 point 재설정
  const clickRegion = (d) => {
    //console.log(d);
    // clickD에 해당 구역 할당
    setClickD(d);
    setSidebarC(d);

    const bbox = d.bbox;
    //console.log(bbox);
    // bbox = [경도시작(왼) 위도시작(위) 경도끝(오) 위도끝(밑)]
    const lat = (bbox[1] + bbox[3]) / 2;
    const lng = (bbox[0] + bbox[2]) / 2;

    setPoint({
      lat: lat,
      lng: lng,
      altitude:
        bbox[2] - bbox[0] < 300
          ? bbox[2] - bbox[0] < 40
            ? bbox[2] - bbox[0] < 8
              ? 0.25
              : 0.5
            : 1
          : 2,
    });
  };

  // point state 변경 시 카메라 옮기기
  useEffect(() => {
    globeRef.current.pointOfView(point, 500);
    // 클릭해서 뷰 포인트 바뀐 경우 - 왼쪽 스윽 + 애니메이션 제한
    if (clickD) {
      setLeft(-500);
      // PC ver
      setSidebarD(`0`);
      // Mobile ber
      setSidebarMbottom("0px");
      sidebarRef.current.scrollTop = 0;

      setTimeout(function () {
        globeRef.current.pauseAnimation();
      }, 500);
    }
  }, [globeRef, point]);

  //자동 회전
  let autoRotateId;
  // const autoRotate = () => {
  //   const globe = globeRef.current;
  //   if (globe) {
  //     globe.pointOfView({
  //       lat: globe.pointOfView().lat + 0.05,
  //       lng: globe.pointOfView().lng + 0.05,
  //     });
  //   }
  //   autoRotateId = requestAnimationFrame(autoRotate);
  // };
  const autoRotate = () => {
    const globe = globeRef.current;
    if (globe) {
      const currentPointOfView = globe.pointOfView();
      globe.pointOfView({
        lat: currentPointOfView.lat,
        lng: currentPointOfView.lng + 0.05,
        altitude: currentPointOfView.altitude,
      });
    }
    autoRotateId = requestAnimationFrame(autoRotate);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Header
            globeRef={globeRef}
            clickD={clickD}
            setClickD={setClickD}
            setSidebarC={setSidebarC}
            setPoint={setPoint}
            setLeft={setLeft}
            setSidebarD={setSidebarD}
            setSidebarMbottom={setSidebarMbottom}
            setIsDpChart={setIsDpChart}
          />

          <div
            style={
              isMobile === true ? { left: "-250px" } : { left: `${left}px` }
            }
            className={styles.worldContainer}
          >
            {countries.features && (
              <>
                {/* <PreloadImages images={images} /> */}
                <Globe
                  ref={globeRef}
                  width={width + 500}
                  height={height}
                  onGlobeReady={autoRotate}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  // globeImageUrl="/map/earthmap3.jpg"
                  backgroundImageUrl="/assets/dark3.jpg"
                  // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                  //globeMaterial={globeMaterial}
                  lineHoverPrecision={0}
                  polygonsData={countries.features.filter(
                    (d) => d.properties.ISO_A2 !== "AQ"
                  )}
                  // polygonAltitude={(d) =>
                  //   clickD ? (d === clickD ? 0.008 : 0) : d === hoverD ? 0.03 : 0
                  // }
                  polygonCapColor={(d) =>
                    // clickD 있으면
                    clickD
                      ? d === clickD
                        ? "#FFB52E"
                        : colorScale(getVal(d))
                      : // clickD 없으면
                      d === hoverD
                      ? "#FFB52E"
                      : colorScale(getVal(d))
                  }
                  //colorScale(getVal(d))
                  polygonSideColor={(d) =>
                    d === clickD ? "#7cc2b8" : "#000050"
                  }
                  polygonStrokeColor={() => "#d1ced9"}
                  polygonLabel={({ properties: d }) => {
                    return clickD
                      ? ``
                      : `<div style="display:flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                  <img style="width:${isMobile ? "70px" : "100px"}"
                   src="${flagEndpoint}/${d.ISO_A2.toLowerCase()}.png" alt="flag" />
                  <p style="color: #f5f5f5; margin: 0px;
                  width:${isMobile ? "130px" : "200px"};
                  font-size:${isMobile ? "13px" : "20px"};
                  font-weight: 600;
                  text-shadow: 1px 1px 0px #3d3d3d;
                  -webkit-text-stroke-width: 0.1px;
                  -webkit-text-stroke-color: black;">
                  ${language === "ko" ? d.ADMIN_Ko : d.ADMIN} (${d.ISO_A2})
                  </p>
                  <p style="margin-top: 0px">위험도 ${
                    isNaN(Math.round(d.score)) ? 0 : Math.round(d.score)
                  }</p>
                  </div>`;
                  }}
                  polygonsTransitionDuration={300}
                  onPolygonHover={setHoverD}
                  onPolygonClick={clickRegion}
                  //marker
                  // labelsData={marker}
                  // labelLat={(d) => d.latitude}
                  // labelLng={(d) => d.longitude}
                  // labelText={(d) => d.name}
                  // labelSize={(d) => 5}
                  // labelDotRadius={(d) => 5}
                  // labelColor={() => "rgba(255, 165, 0, 0.75)"}
                  // labelResolution={3}
                ></Globe>
              </>
            )}
            {isMobile ? (
              <div
                ref={sidebarRef}
                style={{
                  width: width,
                  left: "250px",
                  bottom: sidebarMbottom,
                }}
                className={styles.sidebarM}
              >
                <WorldSidebar
                  country={sidebarC?.properties}
                  isDpChart={isDpChart}
                  bbox={sidebarC?.bbox}
                />
              </div>
            ) : (
              <div
                ref={sidebarRef}
                style={{
                  width: `500px`,
                  right: `${sidebarD}px`,
                }}
                className={styles.sidebar}
              >
                <WorldSidebar
                  country={sidebarC?.properties}
                  isDpChart={isDpChart}
                  bbox={sidebarC?.bbox}
                />
              </div>
            )}
          </div>
        </div>
        {/* {isLogo && (
        <>
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 1,
                ease: "easeOut",
              },
            }}
          >
            <img
              className={
                isMobile
                  ? ani
                    ? `${styles.logoM} ${styles.ani}`
                    : styles.logoM
                  : ani
                  ? `${styles.logoPC} ${styles.ani}`
                  : styles.logoPC
              }
              src="/assets/logo/Logo.png"
            />
          </motion.div>
        </>
      )} */}
      </motion.div>
    </>
  );
}

export default World;
