import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as d3 from "d3";
import Globe from "react-globe.gl";
import axios from "axios";
import styles from "./World.module.css";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PreloadImages from "./PreloadImages";
import { count } from "d3";

function World() {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [clickD, setClickD] = useState(null);
  const [point, setPoint] = useState({
    lat: 37.6,
    lng: 124.2,
    altitude: 2.5,
  });

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  //geoJSON 불러오는 코드
  const getGeoJson = useMemo(() => {
    return axios
      .get("geojson/ne_110m_admin_0_countries.geojson")
      .then((res) => res.data);
  }, []);

  //국기 불러오는 api
  const flagEndpoint = "https://corona.lmao.ninja/assets/img/flags";
  //이미지 미리 로딩
  const images = [];
  if (images.length === 0) {
    //이미지 preloading
    countries.features.map((d) => {
      //console.log(d);
      images.push(
        `https://corona.lmao.ninja/assets/img/flags/${d.properties.ISO_A2.toLowerCase()}.png`
      );
    });
  }
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
    // const lng = (bbox[0] + bbox[2]) / 2;
    const lng = bbox[2] - bbox[0] < 20 ? bbox[2] : (bbox[0] + 3 * bbox[2]) / 4;

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

    // 클릭해서 뷰 포인트 바뀐 경우 - 애니메이션 제한
    if (clickD) {
      setTimeout(function () {
        globeRef.current.pauseAnimation();
      }, 450);
    }
  }, [globeRef, point]);

  // 뒤로가기 클릭 시 (나가기)
  const backBtn = () => {
    globeRef.current.resumeAnimation();
    setClickD(null);
    setPoint({
      altitude: 2.5,
    });
  };

  //   // add and remove target rings
  //   setTimeout(() => {
  //     const targetRing = { lat: endLat, lng: endLng };
  //     setRingsData(curRingsData => [...curRingsData, targetRing]);
  //     setTimeout(() => setRingsData(curRingsData => curRingsData.filter(r => r !== targetRing)), FLIGHT_TIME * ARC_REL_LEN);
  //   }, FLIGHT_TIME);
  // }, []);

  //laguage 선택
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <div className={styles.flex}>
        <Button variant="outlined" className={styles.button} onClick={backBtn}>
          뒤로가기
        </Button>
        <div className={styles.head}>헤드라인</div>
        <div>
          {/* <span>
            <img className={styles.img} src="/assets/earth.png" alt="배너1" />{" "}
            KO |{" "}
          </span>
          <span>EN</span> */}

          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              KO
              {/* <FormatAlignLeftIcon /> */}
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              EN
              {/* <FormatAlignCenterIcon /> */}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {countries.features && (
        <>
          <PreloadImages images={images} />
          <Globe
            ref={globeRef}
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
            <img style="width:100px" src="${flagEndpoint}/${d.ISO_A2.toLowerCase()}.png" alt="flag" />
            <h1 style="color: #f5f5f5;
            text-shadow:     0 1px 0 hsl(174,5%,80%),
	                 0 2px 0 hsl(174,5%,75%),
	                 0 3px 0 hsl(174,5%,70%),
	                 0 4px 0 hsl(174,5%,66%),
	                 0 5px 0 hsl(174,5%,64%),
	                 0 6px 0 hsl(174,5%,62%),
	                 0 7px 0 hsl(174,5%,61%),
	                 0 8px 0 hsl(174,5%,60%),
	
	                 0 0 5px rgba(0,0,0,.05),
	                0 1px 3px rgba(0,0,0,.2),
	                0 3px 5px rgba(0,0,0,.2),
	               0 5px 10px rgba(0,0,0,.2),
	              0 10px 10px rgba(0,0,0,.2),
	              0 5px 5px rgba(0,0,0,.5);">${d.ADMIN} (${d.ISO_A2})</h1>
            GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
            Population: <i>${d.POP_EST}</i>
          `;
            }}
            polygonsTransitionDuration={300}
            onPolygonHover={setHoverD}
            onPolygonClick={clickRegion}
          />
        </>
      )}
    </>
  );
}

export default World;
