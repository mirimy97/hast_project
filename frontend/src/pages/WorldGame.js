import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import * as d3 from "d3";
import Globe from "react-globe.gl";
import * as THREE from "three";
import axios from "axios";
import styles from "./WorldGame.module.css";
import { motion } from "framer-motion";
import HeaderGame from "../components/HeaderGame";
import GameButton from "../components/GamePage/GameButton";
import GameBox from "../components/GamePage/GameBox";
import CapitalGame from "../components/GamePage/CapitalGame";

function World() {
  const globeRef = useRef();
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

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
  //console.log(getVal);
  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  //console.log(maxVal);
  colorScale.domain([0, maxVal]);

  //지구본 왼쪽으로 보내기
  const w = window.innerWidth;
  const shiftFactor = 0.4;
  const shiftAmmount = shiftFactor * w;

  useEffect(() => {
    globeRef.current.pointOfView(point);
    if (hoverD) {
      console.log(hoverD);
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
  }, [globeRef, point, hoverD]);
  //console.log("hoverD", hoverD);
  return (
    <div
      style={{
        marginLeft: `-${shiftAmmount}px`,
      }}
    >
      <motion.div
        className="container text-center"
        initial={{ opacity: 0.5 }}
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
              width={w + shiftAmmount}
              globeImageUrl="map/earthmap.jpg"
              backgroundImageUrl="assets/angryimg.png"
              lineHoverPrecision={0}
              polygonsData={countries.features.filter(
                (d) => d.properties.ISO_A2 !== "AQ"
              )}
              // polygonAltitude={(d) =>
              //   clickD ? (d === clickD ? 0.008 : 0) : d === hoverD ? 0.03 : 0
              // }
              polygonCapColor={(d) =>
                d === hoverD ? "#fff59a" : "transparent"
              }
              //colorScale(getVal(d))
              polygonSideColor={() => "#00000050"}
              polygonStrokeColor={() => "	#FFFFFF"}
              polygonsTransitionDuration={300}
              // onPolygonHover={setHoverD}
            />
          </div>
        </div>
        <div
          className={styles.gamebox}
          style={{
            marginRight: `${w * 0.1}px`,
            marginTop: `${w * 0.03}px`,
          }}
        >
          {countries.features.length !== 0 && (
            <CapitalGame countries={countries} setHoverD={setHoverD} />
          )}

          {/* <div
            style={{position: "absolute", top: "38%", left: "28%"}}
          >
            <GameButton label="국기 맞추기 게임" id="1"/>
          </div>
          <div
            style={{position: "absolute", top: "55%", left: "28%"}}
          >
            <GameButton label="수도 맞추기 게임" id="2"/>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
}

export default World;
