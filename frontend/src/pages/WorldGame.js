import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import Globe from "react-globe.gl";
import axios from "axios";
import styles from "./WorldGame.module.css";
import { motion } from "framer-motion";
import HeaderGame from "../components/HeaderGame";
import GameButton from "../components/GamePage/GameButton";
import CapitalGame from "../components/GamePage/CapitalGame";
import FlagGame from "../components/GamePage/FlagGame";
import { useSelector } from "react-redux";

function World() {
  const globeRef = useRef();
  const [isHovering, setIsHovering] = useState(false); //버튼 호버
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [point, setPoint] = useState({
    lat: 37.6,
    lng: 124.2,
    altitude: 2.5,
  });
  useEffect(() => {
    // load data
    axios
      .get("geojson/ne_110m_admin_0_countries.geojson")
      .then((res) => setCountries(res.data));
  }, []);

  //모바일 여부
  const isMobile = useSelector((state) => state.status.isMobile);
  // 브라우저 창 크기 변화 이벤트 -> globe 리사이징
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
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

  useEffect(() => {
    if (hoverD) {
      //console.log(hoverD);
      const bbox = hoverD.bbox;
      //console.log(bbox);
      // bbox = [경도시작(왼) 위도시작(위) 경도끝(오) 위도끝(밑)]
      const lat = (bbox[1] + bbox[3]) / 2;
      const lng = (bbox[0] + bbox[2]) / 2;

      setPoint({
        lat: lat,
        lng: lng,
        // altitude:
        //   bbox[2] - bbox[0] < 300
        //     ? bbox[2] - bbox[0] < 40
        //       ? bbox[2] - bbox[0] < 8
        //         ? 0.25
        //         : 0.5
        //       : 1
        //     : 2,
      });
    }
  }, [globeRef, hoverD]);
  //console.log("hoverD", hoverD);

  useEffect(() => {
    globeRef.current.pointOfView(point);
  }, [point]);
  //지구본 왼쪽으로 보내기
  const w = window.innerWidth;
  const shiftFactor = 0.4;
  const shiftAmmount = shiftFactor * w;

  const [gameName, setGameName] = useState("");

  const changeHover = (propHover) => {
    setHoverD(propHover);
    console.log(propHover);
  };

  return (
    <div style={isMobile ? {} : { marginLeft: `-${shiftAmmount}px` }}>
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <HeaderGame />
        <div style={{ width: "100%", height: "100%" }}>
          <div
            // style={isMobile == true ? {} : { left: `-${left}px` }}
            className={styles.worldContainer}
          >
            <Globe
              ref={globeRef}
              width={isMobile ? width : width + shiftAmmount}
              height={height}
              globeImageUrl="map/earthmap.jpg"
              backgroundImageUrl="assets/angryimg.png"
              //lineHoverPrecision={0}
              polygonsData={countries.features.filter(
                (d) => d.properties.ISO_A2 !== "AQ"
              )}
              // polygonAltitude={(d) =>
              //   clickD ? (d === clickD ? 0.008 : 0) : d === hoverD ? 0.03 : 0
              // }
              polygonCapColor={(d) =>
                d === hoverD ? "#FFED70" : "transparent"
              }
              //colorScale(getVal(d))
              polygonSideColor={() => "#0050"}
              polygonStrokeColor={() => "rgba(255, 241, 210, 0.4)"}
              polygonsTransitionDuration={300}
              // onPolygonHover={setHoverD}
            />
          </div>
        </div>
        <div
          className={styles.gamebox}
          style={isMobile ? { width: "100%" } : {}}
        >
          {/* {countries.features.length !== 0 && (
            <CapitalGame countries={countries} setHoverD={setHoverD} />
          )} */}
          {gameName === "" ? (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
                <h1 className={styles.gameTitle}>
                  Let's Play <br />
                  The Game
                </h1>
              </motion.div>
              <div
                className={styles.btnFlex}
                style={isMobile ? { flexDirection: "column" } : {}}
              >
                <GameButton
                  label="국기 맞추기 게임"
                  id="1"
                  setGameName={setGameName}
                />
                <GameButton
                  label="수도 맞추기 게임"
                  id="2"
                  setGameName={setGameName}
                />
              </div>
            </>
          ) : gameName === "1" ? (
            <FlagGame
              countries={countries}
              changeHover={changeHover}
              hoverD={hoverD}
            />
          ) : gameName === "2" ? (
            <CapitalGame
              countries={countries}
              changeHover={changeHover}
              hoverD={hoverD}
            />
          ) : (
            ""
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default World;
