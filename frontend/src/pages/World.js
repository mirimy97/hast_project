import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import Globe from "react-globe.gl";
import axios from "axios";
import styles from "./World.module.css";

function World() {
  const globeRef = useRef();
  const [left, setLeft] = useState(0);
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [clickD, setClickD] = useState(null);
  const [point, setPoint] = useState({
    lat: 37.6,
    lng: 124.2,
    altitude: 2.5,
  });

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  const getGeoJson = useMemo(() => {
    return axios
      .get("geojson/ne_110m_admin_0_countries.geojson")
      .then((res) => res.data);
  }, []);

  useEffect(() => {
    // call async function
    getGeoJson.then((data) => setCountries(data));
  }, [getGeoJson]);

  // 클릭시 카메라 point 재설정
  const clickRegion = (d) => {
    console.log(d);
    // clickD에 해당 구역 할당
    setClickD(d);

    const bbox = d.bbox;
    console.log(bbox);
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
      setLeft(window.innerWidth * 0.2);

      setTimeout(function () {
        globeRef.current.pauseAnimation();
      }, 500);
    }
  }, [globeRef, point]);

  // 뒤로가기 클릭 시 (나가기)
  const backBtn = () => {
    globeRef.current.resumeAnimation();
    setClickD(null);
    setPoint({
      altitude: 2.5,
    });
    setLeft(0);
  };

  const flagEndpoint = "https://corona.lmao.ninja/assets/img/flags";

  return (
    <>
      <button onClick={backBtn}>뒤로가기</button>
      <div style={{ left: `-${left}px` }} className={styles.worldContainer}>
        {countries.features && (
          <Globe
            ref={globeRef}
            height={window.innerHeight}
            globeImageUrl="map/8k_earth_daymap.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            lineHoverPrecision={0}
            polygonsData={countries.features.filter(
              (d) => d.properties.ISO_A2 !== "AQ"
            )}
            polygonAltitude={(d) =>
              clickD ? (d === clickD ? 0.008 : 0) : d === hoverD ? 0.03 : 0
            }
            polygonCapColor={(d) =>
              // clickD 있으면
              clickD
                ? d === clickD
                  ? "#e6bb3c30"
                  : "#ffffff00"
                : // clickD 없으면
                d === hoverD
                ? "#7cc2b870"
                : "#ffffff00"
            }
            polygonSideColor={(d) => (d === clickD ? "#e6bb3c" : "#00000050")}
            polygonStrokeColor={() => "#00000080"}
            polygonLabel={({ properties: d }) => {
              return clickD
                ? ``
                : `
            <img src="${flagEndpoint}/${d.ISO_A2.toLowerCase()}.png" alt="flag" />
            <h1 style="color: yellow;">${d.ADMIN} (${d.ISO_A2}): </h1>
            GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
            Population: <i>${d.POP_EST}</i>
          `;
            }}
            polygonsTransitionDuration={300}
            onPolygonHover={setHoverD}
            onPolygonClick={clickRegion}
          />
        )}
      </div>
    </>
  );
}

export default World;
