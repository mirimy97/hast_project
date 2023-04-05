import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Toggle from "../components/Toggle";
import { PlacesMarker } from "../components/PlacesMarker";
import { NewsMarker } from "../components/NewsMarker";
import { useSelector } from "react-redux";
import MapDrawer from "../components/MapDrawer";
import { Sidebar } from "../components/SideMotion/Sidebar";
import { t } from "i18next";
import Loading from "./Loading";

export default function Map() {
  const mapRef = useRef(null);
  // countryInfo 값 받아오기
  const location = useLocation();
  const isMobile = useSelector((state) => state.status.isMobile);

  // const [loadingPage, setLodingPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // useState에 따라 language(en-ko) 바뀌게끔
  const language = useSelector((state) => state.language.value);
  // Globe로부터 받아올 정보
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    console.log(location);
    // setTimeout(() => {
    //   setLodingPage(false);
    // }, 2000);
    if (location.state === null) {
      const savedCountryInfo = localStorage.getItem("countryInfo");
      // console.log(JSON.parse(savedCountryInfo));
      setCountryInfo(JSON.parse(savedCountryInfo));
    } else {
      // console.log(location.state?.countryInfo);
      setCountryInfo(location.state?.countryInfo);
    }
  }, []);

  useEffect(() => {
    if (countryInfo !== null) {
      localStorage.setItem("countryInfo", JSON.stringify(countryInfo));
      setCenter({
        lat: (countryInfo.ne.lat + countryInfo.sw.lat) / 2,
        lng: (countryInfo.ne.lng + countryInfo.sw.lng) / 2,
      });
      setBounds({
        nw: { lat: countryInfo.ne.lat, lng: countryInfo.sw.lng },
        se: { lat: countryInfo.sw.lat, lng: countryInfo.ne.lng },
      });
    }
  }, [countryInfo]);

  // 치안 점수 표시 (히트맵)
  const [dangerList, setDangerList] = useState([]);
  useEffect(() => {
    axios
      .get("https://apitest.hastmap.duckdns.org/api/info/dots")
      .then((res) => {
        if (res.data.resultCode === "SUCCESS") {
          // console.log(res.data.result)
          setDangerList(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // 기사 조회해서 하위 컴포넌트에 넘겨주기
  // 좌표 클릭시 api 요청 -> 응답으로 기사들 넘겨주는 듯
  const [allNews, setAllNews] = useState([]);
  useEffect(() => {
    if (countryInfo !== null) {
      axios
        .get(
          `https://apitest.hastmap.duckdns.org/api/articles/${countryInfo.FIPS}`
        )
        .then((res) => {
          if (res.data.resultCode === "SUCCESS") {
            console.log(res.data.result);
            setAllNews(res.data.result);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [countryInfo]);

  // center, zoom, bound state 사용
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(8);
  const [bounds, setBounds] = useState(null);
  const [initialZoom, setInitialZoom] = useState(null);

  const calculateZoom = (bounds) => {
    const ZOOM_MAX = 21;
    const ZOOM_MIN = 0;
    const MAX_PIXELS = 1024;

    const latDiff = Math.abs(bounds.nw.lat - bounds.se.lat);
    const lngDiff = Math.abs(bounds.nw.lng - bounds.se.lng);

    const latZoom = Math.floor(Math.log2(MAX_PIXELS / latDiff));
    const lngZoom = Math.floor(Math.log2(MAX_PIXELS / lngDiff));
    const zoom = Math.min(latZoom, lngZoom, ZOOM_MAX);
    return zoom > ZOOM_MIN ? zoom : ZOOM_MIN;
  };

  const setMapBounds = (bounds) => {
    if (bounds !== null) {
      const zoom = calculateZoom(bounds);
      setZoom(zoom);
      setInitialZoom(zoom);
    }
  };

  const MyKey = process.env.REACT_APP_MAP_API;

  useEffect(() => {
    setMapBounds(bounds);
  }, [bounds]);

  // 장소 api
  const [hospital, setHospital] = useState([]);
  const [police, setPolice] = useState([]);
  const [embassy, setEmbassy] = useState([]);
  // 보여주기
  const [finish, setFinish] = useState(false);
  // api 중복 요청 방지
  const [firstH, setFirstH] = useState(true);
  const [firstP, setFirstP] = useState(true);
  const [firstE, setFirstE] = useState(true);

  const getPlaces = (map, maps, coords, idx) => {
    // console.log(center, zoom)
    const type = ["hospital", "police", "embassy"];

    // console.log(map)
    const service = new maps.places.PlacesService(map);

    // 장소 API 요청 과정
    const request = {
      location: { lat: coords.lat, lng: coords.lng },
      radius: 5000,
      type: type[idx - 1],
      // keyword: idx === 1 ? "medical center|general hospital" : "",
      language: language,
    };
    // 각 type별 결과 넣을 state
    let result = [];

    service.nearbySearch(request, (results, status, pagination) => {
      console.log(coords);
      console.log("places api 사용");
      setFinish(false);
      if (status === maps.places.PlacesServiceStatus.OK) {
        console.log(results); // results.map()으로 result.geometry, result.name, results[0].geometry.location
        const newList = results.map((res) => {
          return {
            placeId: res.place_id,
            lat: res.geometry.location.lat(),
            lng: res.geometry.location.lng(),
            name: res.name,
            rating: res.rating,
            address: res.vicinity,
          };
        });
        result.push(...newList);
        console.log(result);
        if (pagination.hasNextPage) {
          // Use the pagination object to retrieve the next set of results
          pagination.nextPage();
        } else {
          console.log("끝");
          setFinish(true);
        }
      } else {
        console.log("Error:", status); // Handle the error
        setFinish(true);
        // Error: ZERO_RESULTS
      }
    });

    if (idx === 1) {
      setHospital(result);
    } else if (idx === 2) {
      setPolice(result);
    } else {
      setEmbassy(result);
    }
  };

  // zoom 변경 감지
  const handleZoomChange = (map) => {
    // console.log(`변경되는 줌 : ${map.getZoom()}`)
    setZoom(map.getZoom());
  };

  const [heatmapData, setHeatmapData] = useState(null);

  useEffect(() => {
    if (dangerList.length !== 0) {
      const newDangerList = dangerList.map((danger) => {
        return {
          lat: danger.latitude,
          lng: danger.longitude,
          weight: danger.score / 10,
        };
      });
      setHeatmapData({
        positions: newDangerList,
        options: {
          radius: 25,
          opacity: 0.8,
        },
      });
    }
  }, [dangerList]);

  useEffect(() => {
    if (heatmapData !== null) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      // setIsLoading(false)
    }
  }, [heatmapData]);

  // 좌표 클릭 - 클릭 이벤트
  // const [clickCoords, setClickCoords] = useState(null)
  const onClickHandler = (e) => {
    setCenter({ lat: e.lat, lng: e.lng });
    setZoom(12);
    console.log(
      `클릭 이벤트 center : ${center.lat} ${center.lng}, zoom: ${zoom}`
    );
    // setClickCoords({lat: e.lat, lng: e.lng})
    setToggle([]);
    setFirstH(true);
    setFirstP(true);
    setFirstE(true);
  };

  // styledmaptype
  const mapStyles = {
    // draggableCursor: 'default',
    draggableCursor: "url(/assets/aim.png), auto",
    fullscreenControl: false,
    zoomControl: false,
    gestureHandling: "greedy",
    styles: [
      {
        featureType: "road",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  // toggle 클릭
  const [toggle, setToggle] = useState([]);
  const [showH, setShowH] = useState(false);
  const [showP, setShowP] = useState(false);
  const [showE, setShowE] = useState(false);

  // Marker 클릭
  const [target, setTarget] = useState(null);
  const [marker, setMarker] = useState(null);
  const markerClicked = (key, marker) => {
    console.log(marker);
    setMarker({
      lat: marker.lat,
      lng: marker.lng,
    });
    console.log(key);
    setTarget(key);
  };

  const [mapMarkers, setMapMarkers] = useState([]);
  useEffect(() => {
    if (dangerList !== null) {
      const updateList = dangerList.map((news) => {
        return {
          id: news.id,
          // engKeyword: news.engKeyword,
          // korKeyword: news.korKeyword,
          lat: news.latitude,
          lng: news.longitude,
          score: news.score,
        };
      });
      // console.log(updateList)
      setMapMarkers(updateList);
    }
  }, [dangerList]);

  // initialize => 초기 나라 좌표로 이동
  const Initialize = () => {
    if (
      (center.lat !== (countryInfo.ne.lat + countryInfo.sw.lat) / 2 &&
        center.lng !== (countryInfo.ne.lng + countryInfo.sw.lng) / 2) ||
      zoom !== initialZoom
    ) {
      setCenter({
        lat: (countryInfo.ne.lat + countryInfo.sw.lat) / 2,
        lng: (countryInfo.ne.lng + countryInfo.sw.lng) / 2,
      });
      setZoom(initialZoom);
    }
  };

  // mapRef 확인
  // useEffect(() => {
  //   if (mapRef.current !== null) {
  //     console.log(mapRef.current.map)
  //     console.log(mapRef.current.map.getCenter())
  //   }
  // }, [mapRef.current])

  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: MyKey,
          language: language, // 언어 설정에 따라 달라지게끔
          region: countryInfo.country, // https://en.wikipedia.org/wiki/ISO_3166-1
          libraries: ["places", "geometry"],
        }}
        defaultCenter={{
          lat: countryInfo.latitude,
          lng: countryInfo.longitude,
        }}
        center={center}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          // Save the map and maps variables to the ref object
          mapRef.current = { map, maps };
          // 줌 변경될 때 변경된 zoom level 가져오게끔
          map.addListener("zoom_changed", () => handleZoomChange(map));
          // map.setOptions({ draggableCursor : "url(/assets/back.png), pointer" })
        }}
        onChildClick={markerClicked}
        onClick={onClickHandler}
        // onChildMouseOver
        options={mapStyles}
        // 히트맵으로 변경
        heatmapLibrary={true}
        heatmap={heatmapData}
      >
        {zoom >= 6 &&
          mapMarkers &&
          mapMarkers.map((marker) => (
            <NewsMarker
              key={marker.placeId}
              id={marker.id}
              lat={marker.lat}
              lng={marker.lng}
              // onMouseover={() => console.log(marker)}
            />
          ))}

        {/* 장소 api 불러올 때 spinner 넣기 */}
        {/* { finish ? <></> : <LoadingSpinner/>} */}
        {zoom >= 12 &&
          finish &&
          showH &&
          hospital.map((hos) => (
            <PlacesMarker
              key={hos.placeId}
              id={1}
              lat={hos.lat}
              lng={hos.lng}
              place={hos}
              target={hos.placeId === target}
            />
          ))}
        {zoom >= 12 &&
          finish &&
          showP &&
          police.map((pol) => (
            <PlacesMarker
              key={pol.placeId}
              id={2}
              lat={pol.lat}
              lng={pol.lng}
              place={pol}
              target={pol.placeId === target}
            />
          ))}
        {zoom >= 12 &&
          finish &&
          showE &&
          embassy.map((emb) => (
            <PlacesMarker
              key={emb.placeId}
              id={3}
              lat={emb.lat}
              lng={emb.lng}
              place={emb}
              target={emb.placeId === target}
            />
          ))}
      </GoogleMapReact>

      {/* 토글버튼 */}
      <div>
        <Toggle
          icon="🏥"
          place={"Loca1"}
          idx={1}
          toggle={toggle}
          setToggle={setToggle}
          setShowPlace={setShowH}
          placeList={hospital}
          getPlaces={getPlaces}
          mapRef={mapRef}
          center={center}
          first={firstH}
          setFirst={setFirstH}
        />
        <Toggle
          icon="🚓"
          place={"Loca2"}
          idx={2}
          toggle={toggle}
          setToggle={setToggle}
          setShowPlace={setShowP}
          placeList={police}
          getPlaces={getPlaces}
          mapRef={mapRef}
          center={center}
          first={firstP}
          setFirst={setFirstP}
        />
        <Toggle
          icon="🌐"
          place={"Loca3"}
          idx={3}
          toggle={toggle}
          setToggle={setToggle}
          setShowPlace={setShowE}
          placeList={embassy}
          getPlaces={getPlaces}
          mapRef={mapRef}
          center={center}
          first={firstE}
          setFirst={setFirstE}
        />
        <div
          style={{
            position: "absolute",
            top: isMobile ? "60px" : "75px",
            left: "20px",
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            fontWeight: "bold",
            color: "rgb(107 107 107);",
            margin: 0,
          }}
        >
          {language === "en"
            ? "Click on the coordinates for more information"
            : "원하는 위치를 클릭하여 상세 정보를 확인하세요"}
        </div>
      </div>

      {/* 반응형 */}
      {isMobile ? (
        <div>
          <Link to="/">
            <div
              style={{
                position: "absolute",
                bottom: "42px",
                left: "8px",
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              <img
                src="/assets/back.png"
                alt="뒤로가기"
                width={50}
                style={{ zIndex: 10 }}
              />
              <div
                style={{
                  position: "relative",
                  left: "-20px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "3px 8px 3px 15px",
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                {t("goMain.Title")}
              </div>
            </div>
          </Link>

          <div
            style={{
              position: "absolute",
              bottom: "50px",
              right: "10px",
              display: "flex",
              alignItems: "center",
              fontSize: "0.8rem",
              cursor: "pointer",
              padding: "3px",
              backgroundColor: "#FFFFFF90",
              borderRadius: "50px",
            }}
            onClick={Initialize}
          >
            <img src="/assets/reset.png" alt="reset" width="25px" />
          </div>
          <MapDrawer
            allNews={allNews}
            setAllNews={setAllNews}
            clickCoords={marker}
          />
        </div>
      ) : (
        <div>
          <Link to="/">
            <div
              style={{
                position: "absolute",
                bottom: "3px",
                left: "8px",
                display: "flex",
                alignItems: "center",
                fontSize: "1rem",
              }}
            >
              <img
                src="/assets/back.png"
                alt="뒤로가기"
                width={55}
                style={{ zIndex: 10 }}
              />
              <div
                style={{
                  position: "relative",
                  left: "-25px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "3px 8px 3px 20px",
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                {t("goMain.Title")}
              </div>
            </div>
          </Link>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "6px",
              display: "flex",
              alignItems: "center",
              fontSize: "0.8rem",
              cursor: "pointer",
              padding: "3px",
              backgroundColor: "#FFFFFF90",
              // borderRadius: "50px"
            }}
            onClick={Initialize}
          >
            <img src="/assets/reset.png" alt="reset" width="30px" />
          </div>
          <Sidebar
            allNews={allNews}
            setAllNews={setAllNews}
            clickCoords={marker}
          />
        </div>
      )}
    </div>
  );
}
