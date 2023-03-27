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
import GameBox from "../components/GamePage/GameBox";

function World() {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    // load data
    fetch("geojson/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
  console.log(getVal);
  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  console.log(maxVal);
  colorScale.domain([0, maxVal]);

  //지구본 왼쪽으로 보내기
  const w = window.innerWidth;
  const shiftFactor = 0.4;
  const shiftAmmount = shiftFactor * w;

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
              width={w + shiftAmmount}
              globeImageUrl="map/earthmap.jpg"
              backgroundImageUrl="assets/angryimg.png"
              lineHoverPrecision={0}
              //   polygonsData={countries.features.filter(
              //     (d) => d.properties.ISO_A2 !== "AQ"
              //   )}
              polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
              polygonCapColor={(d) =>
                d === hoverD ? "steelblue" : colorScale(getVal(d))
              }
              polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
              polygonStrokeColor={() => "#111"}
              polygonLabel={({ properties: d }) => `
          <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
          GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
          Population: <i>${d.POP_EST}</i>
        `}
              onPolygonHover={setHoverD}
              polygonsTransitionDuration={300}
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
          <GameBox />
        </div>
      </motion.div>
    </div>
  );
}

export default World;
