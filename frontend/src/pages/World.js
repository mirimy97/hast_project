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
import PreloadImages from "./PreloadImages";
import { Color } from "three";

import WorldSidebar from "../components/WorldSidebar";
import Header from "../components/Header";
import { useSelector } from "react-redux";

function World() {
  const globeRef = useRef();
  const isMobile = useSelector((state) => state.isMobile.isMobile);
  // const sidebarRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [left, setLeft] = useState(0);
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [clickD, setClickD] = useState(null);
  const [point, setPoint] = useState({
    lat: 37.6,
    lng: 124.2,
    altitude: 2.5,
  });
  const [sidebarD, setSidebarD] = useState(-600);
  const [sidebarMbottom, setSidebarMbottom] = useState("-100vh");

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

  //redux- language 불러오기
  const language = useSelector((state) => state.language.value);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  //geoJSON 불러오는 코드
  const getGeoJson = useMemo(() => {
    return axios
      .get("geojson/ne_110m_admin_0_countries.geojson")
      .then((res) => res.data);
  }, []);

  //국기 불러오는 api
  const flagEndpoint = "/assets/flags";
  //이미지 미리 로딩
  // const images = [];
  // if (images.length === 0) {
  //   //이미지 preloading
  //   countries.features.map((d) => {
  //     //console.log(d);
  //     images.push(`/assets/flags/${d.properties.ISO_A2.toLowerCase()}.png`);
  //   });
  // }
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
      // PC ver
      setSidebarD(`-${window.innerWidth * 0.2}`);
      // Mobile ber
      setSidebarMbottom("0px");
      // sidebarRef.current.scrollTop = 0;

      setTimeout(function () {
        globeRef.current.pauseAnimation();
      }, 500);
    }
  }, [globeRef, point]);

  // custom globe material
  const globeMaterial = new THREE.MeshPhysicalMaterial();
  const textures = {
    map: new THREE.TextureLoader().load("/map/earthmap.jpg"),
    bump: new THREE.TextureLoader().load("/map/earthbump.jpg"),
    spec: new THREE.TextureLoader().load("/map/earthspec.jpg"),
  };
  //globeMaterial.map = textures.map;
  globeMaterial.roughnessMap = textures.spec;
  globeMaterial.bumpMap = textures.bump;
  globeMaterial.bumpScale = 0.05;
  globeMaterial.envMapIntensity = 0.4;
  globeMaterial.sheen = 1;
  globeMaterial.sheenRoughness = 0.75;
  globeMaterial.sheenColor = new Color("#ff8a00").convertSRGBToLinear();
  globeMaterial.clearcoat = 0.05;

  //   // add and remove target rings
  //   setTimeout(() => {
  //     const targetRing = { lat: endLat, lng: endLng };
  //     setRingsData(curRingsData => [...curRingsData, targetRing]);
  //     setTimeout(() => setRingsData(curRingsData => curRingsData.filter(r => r !== targetRing)), FLIGHT_TIME * ARC_REL_LEN);
  //   }, FLIGHT_TIME);
  // }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header
        globeRef={globeRef}
        clickD={clickD}
        setClickD={setClickD}
        setPoint={setPoint}
        setLeft={setLeft}
        setSidebarD={setSidebarD}
        setSidebarMbottom={setSidebarMbottom}
      />
      <div className={styles.background}></div>
      <div
        style={isMobile == true ? {} : { left: `-${left}px` }}
        className={styles.worldContainer}
      >
        {countries.features && (
          <>
            {/* <PreloadImages images={images} /> */}
            <Globe
              ref={globeRef}
              width={width}
              height={height}
              globeImageUrl="map/earthmap.jpg"
              backgroundImageUrl="assets/angryimg.png"
              //backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              //globeMaterial={globeMaterial}
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
                  ${language == "ko" ? d.ADMIN_Ko : d.ADMIN} (${d.ISO_A2})
                  </p>
                  </div>`;
              }}
              polygonsTransitionDuration={300}
              onPolygonHover={setHoverD}
              onPolygonClick={clickRegion}
            />
          </>
        )}
        {isMobile == true ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              bottom: sidebarMbottom,
            }}
            className={styles.sidebarM}
          >
            <WorldSidebar country={clickD?.properties} />
          </div>
        ) : (
          <div
            // ref={sidebarRef}
            style={{
              width: `500px`,
              right: `${sidebarD}px`,
            }}
            className={styles.sidebar}
          >
            <WorldSidebar country={clickD?.properties} />
          </div>
        )}
      </div>
    </div>
  );
}

export default World;
