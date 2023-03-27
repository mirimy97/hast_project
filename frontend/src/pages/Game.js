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
import styles from "./World.module.css";

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

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        // style={isMobile === true ? {} : { left: `-${left}px` }}
        className={styles.worldContainer}
      >
        <Globe
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
  );
}

export default World;
