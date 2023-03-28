import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Toggle from "../components/Toggle";
import { Marker } from "../components/Marker";
import { useSelector } from "react-redux";
import MapDrawer from "../components/MapDrawer";
import { Sidebar } from "../components/SideMotion/Sidebar";
import { t } from "i18next";

export default function Map() {
  // countryInfo 값 받아오기
  const location = useLocation();

  const isMobile = useSelector((state) => state.isMobile.isMobile);
  const [isLoading, setIsLoading] = useState(true);
  // useState에 따라 language(en-ko) 바뀌게끔
  const language = "en";
  // Globe로부터 받아올 정보
  const [countryInfo, setCountryInfo] = useState(null);
  
  useEffect(() => {
    console.log(location)
    if (location.state === null) {
      const savedCountryInfo = localStorage.getItem("countryInfo");
      console.log(JSON.parse(savedCountryInfo))
      setCountryInfo(JSON.parse(savedCountryInfo));
    }
    else {
      console.log(location.state?.countryInfo)
      setCountryInfo(location.state?.countryInfo)
    }
  }, [])


  useEffect(() => {
    console.log(countryInfo)
    if (countryInfo !== null) {
      console.log('null아님')
      localStorage.setItem("countryInfo", JSON.stringify(countryInfo));
      setCenter({
        lat: (countryInfo.ne.lat + countryInfo.sw.lat)/2,
        lng: (countryInfo.ne.lng + countryInfo.sw.lng)/2,
      })
      setBounds({
        nw: { lat: countryInfo.ne.lat, lng: countryInfo.sw.lng },
        se: { lat: countryInfo.sw.lat, lng: countryInfo.ne.lng },
      })
    }
  }, [countryInfo]);


  // center, zoom, bound state 사용
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(8);
  const [bounds, setBounds] = useState(null);


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
      console.log(zoom);
      setZoom(zoom);
      setIsLoading(false);
    }
  };

  const MyKey = process.env.REACT_APP_MAP_API;
  // const MyKey = "AIzaSyD9tQAFGqDK-O6YrVeUQgpd9upyF474zI8"

  useEffect(() => {
    setMapBounds(bounds);
  }, [bounds]);

  // 장소 api
  const [hospital, setHospital] = useState([]);
  const [embassy, setEmbassy] = useState([]);
  const [police, setPolice] = useState([]);

  const getPlaces = (map, maps, coords) => {
    // console.log(center, zoom)
    console.log({ lat: coords.lat, lng: coords.lng });
    console.log("places api 사용");
    const type = ["hospital", "embassy", "police"];

    const service = new maps.places.PlacesService(map);

    for (let i = 0; i < 3; i++) {
      const request = {
        location: { lat: coords.lat, lng: coords.lng },
        radius: 50000,
        type: type[i],
        keyword: i === 0 ? "medical center|general hospital" : "",
        language: language,
      };
      // 각 type별 결과 넣을 state
      let result = [];

      service.nearbySearch(request, (results, status, pagination) => {
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
          }
        } else {
          console.log("Error:", status); // Handle the error
          // Error: ZERO_RESULTS
        }
      });

      if (i === 0) {
        setHospital(result);
      } else if (i === 1) {
        setEmbassy(result);
      } else {
        setPolice(result);
      }
    }
  };

  // zoom 변경 감지
  const handleZoomChange = (map) => {
    // console.log(`변경되는 줌 : ${map.getZoom()}`)
    setZoom(map.getZoom());
  };

  // 치안도 표시 임시 데이터
  const dangerList = [
    {
      id: 1,
      lat: 35.907757,
      lng: 127.766922,
      score: -50,
    },
    {
      id: 2,
      lat: 38,
      lng: 128.3321,
      score: -30,
    },
    {
      id: 3,
      lat: 35.213234,
      lng: 129.23143,
      score: -25,
    },
    {
      id: 4,
      lat: 35.31,
      lng: 128.8,
      score: -10,
    },
    {
      id: 5,
      lat: 37.32567,
      lng: 129.143542,
      score: -28,
    },
  ];

  // 치안도 표시 apiLoaded
  const getDanger = (map, maps) => {
    dangerList.map((danger) => {
      const circle = new maps.Circle({
        strokeColor: danger.score <= -40 ? "#FF0000" : "#FFFF00",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: danger.score <= -40 ? "#FF0000" : "#FFFF00",
        fillOpacity: 0.5,
        map,
        center: { lat: danger.lat, lng: danger.lng },
        radius: 3000,
        id: danger.id,
      });
      // 각 서클에 이벤트리스너 추가
      circle.addListener("click", () => {
        handleCircleClick(danger);
      });
      return circle;
    });
  };

  //
  const [nowCircle, setNowCircle] = useState(null);
  const [nowDanger, setNowDanger] = useState(null);
  const mapRef = useRef(null);

  const handleCircleClick = (circle) => {
    setCenter({ lat: circle.lat, lng: circle.lng });
    setNowCircle(circle.id);
    setNowDanger(circle);
  };

  useEffect(() => {
    if (center !== null) {
      if (center.lat && center.lng && nowDanger) {
        // 클릭 한 번만 하게끔
        console.log("달라짐");
        setZoom(13);
        console.log(nowCircle);
        console.log(nowDanger);
  
        const { map, maps } = mapRef.current;
        // console.log(map, maps)
        // place api 사용해서 장소 정보 들고오기
        // getPlaces(map, maps, nowDanger);
      }
    }
  }, [nowCircle]);

  // styledmaptype
  const mapStyles = {
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
  const markerClicked = (key) => {
    console.log(key);
    setTarget(key);
  };

  return isLoading ? (
    <div></div>
  ) : (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
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
          // 치안도 표시
          getDanger(map, maps);
          // 줌 변경될 때 변경된 zoom level 가져오게끔
          map.addListener("zoom_changed", () => handleZoomChange(map));
        }}
        onChildClick={markerClicked}
        options={mapStyles}
      >
        {zoom >= 12 &&
          hospital &&
          showH &&
          hospital.map((hos) => (
            <Marker
              key={hos.placeId}
              id={1}
              lat={hos.lat}
              lng={hos.lng}
              place={hos}
              target={hos.placeId === target}
            />
          ))}
        {zoom >= 12 &&
          police &&
          showP &&
          police.map((pol) => (
            <Marker
              key={pol.placeId}
              id={2}
              lat={pol.lat}
              lng={pol.lng}
              place={pol}
              target={pol.placeId === target}
            />
          ))}
        {zoom >= 12 &&
          embassy &&
          showE &&
          embassy.map((emb) => (
            <Marker
              key={emb.placeId}
              id={3}
              lat={emb.lat}
              lng={emb.lng}
              place={emb}
              target={emb.placeId === target}
            />
          ))}
      </GoogleMapReact>
      {zoom >= 12 ? (
        <div>
          <Toggle
            icon="🏥"
            place={"Loca1"}
            idx={1}
            toggle={toggle}
            setToggle={setToggle}
            setShowPlace={setShowH}
          />
          <Toggle
            icon="🚓"
            place={"Loca2"}
            idx={2}
            toggle={toggle}
            setToggle={setToggle}
            setShowPlace={setShowP}
          />
          <Toggle
            icon="🌐"
            place={"Loca3"}
            idx={3}
            toggle={toggle}
            setToggle={setToggle}
            setShowPlace={setShowE}
          />
        </div>
      ) : (
        <div></div>
      )}
      {isMobile ? (
        zoom < 12 ? (
          <div>
            <Link to="/">
              <div
                style={{
                  position: "absolute",
                  top: "8px",
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
                    // paddingLeft: "10px",
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  {t("goMain.Title")}
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <></>
        )
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
                fontSize: "1.2rem",
              }}
            >
              <img
                src="/assets/back.png"
                alt="뒤로가기"
                width={100}
                style={{ zIndex: 10 }}
              />
              <div
                style={{
                  position: "relative",
                  left: "-40px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "3px 8px 3px 20px",
                  // paddingLeft: "10px",
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                {t("goMain.Title")}
              </div>
            </div>
          </Link>
        </div>
      )}
      {isMobile ? <MapDrawer /> : <Sidebar />}
    </div>
  );
}
