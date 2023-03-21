import React from "react";
import GoogleMapReact from "google-map-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Toggle from "../components/Toggle";
import MapSidebar from "../components/MapSidebar";
import { t } from "i18next";

export default function Map() {
  const [isLoading, setIsLoading] = useState(true);
  // 받아올 정보 (임시데이터)
  const countryInfo = {
    country: "KR",
    latitude: 35.907757,
    longitude: 127.766922,
    name: "South Korea",
  };
  // const countryInfo = {
  //   country: 'RU',
  //   latitude: 61.52401,
  //   longitude: 105.318756,
  //   name: 'Russia'
  // }

  const [center, setCenter] = useState({
    lat: countryInfo.latitude,
    // lat: 35.907757,
    lng: countryInfo.longitude,
  });
  const [zoom, setZoom] = useState(8);

  const [ne, setNe] = useState({});
  const [sw, setSw] = useState({});
  // const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const [bounds, setBounds] = useState({
    nw: { lat: ne.lat, lng: sw.lng },
    se: { lat: sw.lat, lng: ne.lng },
  });

  const calculateZoom = (bounds) => {
    const WORLD_DIM = { height: 256, width: 256 };
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
    if (bounds.nw.lat !== undefined) {
      const zoom = calculateZoom(bounds);
      console.log(zoom);
      setZoom(zoom);
      setIsLoading(false);
    }
  };

  // // 경계값 들고오기
  const MyKey = "AIzaSyD9tQAFGqDK-O6YrVeUQgpd9upyF474zI8";
  // // // 지오코딩 api 위한 url
  // const url = "https://maps.googleapis.com/maps/api/geocode/json"
  // const getCountryBounds = () => {
  //   axios.get(url, {
  //     params: {
  //       address: countryInfo.name,
  //       key: MyKey
  //     }
  //   })
  //     .then((res) => {
  //       // console.log(res.data.results[0].geometry.bounds) // northeast-{lat, lng}, southwest-{lat, lng}
  //       setNe(res.data.results[0].geometry.bounds.northeast)
  //       setSw(res.data.results[0].geometry.bounds.southwest)
  //       const neBound = res.data.results[0].geometry.bounds.northeast
  //       const swBound = res.data.results[0].geometry.bounds.southwest
  //       setBounds({
  //         nw: {lat: neBound.lat, lng: swBound.lng},
  //         se: {lat: swBound.lat, lng: neBound.lng}
  //       })
  //       console.log(res.data.results[0].geometry.bounds)
  //     })
  //     // .then(setMapBounds(bounds))
  //     .catch((err) => console.log(err))
  // }

  useEffect(() => {
    // getCountryBounds()
    setNe({ lat: 38.63400000000001, lng: 131.1603 });
    setSw({ lat: 33.0041, lng: 124.5863 });
    const neBound = { lat: 38.63400000000001, lng: 131.1603 };
    const swBound = { lat: 33.0041, lng: 124.5863 };
    setBounds({
      nw: { lat: neBound.lat, lng: swBound.lng },
      se: { lat: swBound.lat, lng: neBound.lng },
    });
  }, []);

  useEffect(() => {
    setMapBounds(bounds);
  }, [bounds]);

  const handleApiLoaded = (map, maps) => {
    if (sw !== {} || sw !== undefined) {
      const newBounds = new maps.LatLngBounds(
        new maps.LatLng(sw),
        new maps.LatLng(ne)
      );
      console.log(sw, ne);
      // map.fitBounds(newBounds)

      // 장소 api
      // const service = new maps.places.PlacesService(map);
      // const request = {
      //   query: 'hospital',
      //   bounds: newBounds,
      //   location: new maps.LatLng(countryInfo.latitude, countryInfo.longitude)
      // };

      // // Send the text search request
      // service.textSearch(request, (results, status, pagination) => {
      //   if (status === maps.places.PlacesServiceStatus.OK) {
      //     console.log(results); // Print the search results

      //     if (pagination.hasNextPage) {
      //       // Use the pagination object to retrieve the next set of results
      //       pagination.nextPage();
      //     }
      //   } else {
      //     console.log('Error:', status); // Handle the error
      //   }
      // });
    }
  };

  // const mapOptions = {
  //   restriction: {
  //     latLngBounds: {
  //       north: ne.lat,
  //       south: sw.lat,
  //       west: sw.lng,
  //       east: ne.lng,
  //     },
  //     strictBounds: false,
  //   },
  // }

  // type 매개변수 - hospital (+health?), embassy, police

  // onclick 시 줌 인
  // const onClickHandler = (e) => {
  //   // 서클 안에 있을 때만 (조건)
  //   setCenter({lat: e.lat, lng: e.lng})
  //   setZoom(13)
  //   // console.log(`원래 : ${zoom}`)
  //   console.log(`클릭 이벤트 center : ${center.lat} ${center.lng}, zoom: ${zoom}`)
  // }

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
  // 반경 저장하는 state
  const [radius, setRadius] = useState(4000);
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
        radius: radius,
        id: danger.id,
      });
      // 각 서클에 이벤트리스너 추가
      circle.addListener("click", () => {
        // console.log(danger)
        setCenter({ lat: danger.lat, lng: danger.lng });
        setZoom(13);
      });
      return circle;
      // new maps.Circle({
      //     strokeColor: (danger.score <= -40 ? '#FF0000' : '#FFFF00'),
      //     strokeOpacity: 0.5,
      //     strokeWeight: 1,
      //     fillColor: (danger.score <= -40 ? '#FF0000' : '#FFFF00'),
      //     fillOpacity: 0.5,
      //     map,
      //     center: {lat: danger.lat, lng: danger.lng},
      //     radius: radius,
      //     id: danger.id,
      // })
    });
  };

  // styledmaptype
  const mapStyles = {
    fullscreenControl: false,
    styles: [
      {
        featureType: "road",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  };

  return isLoading ? (
    <div></div>
  ) : (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: MyKey,
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
          handleApiLoaded(map, maps);
          // 치안도 표시
          getDanger(map, maps);
          // 줌 변경될 때 변경된 zoom level 가져오게끔
          map.addListener("zoom_changed", () => handleZoomChange(map));
        }}
        // options={mapOptions} // option 때문에 나타난 현상..
        // onClick={onClickHandler}
        options={mapStyles}
        // bounds={mapOptions.restriction.latLngBounds}
        // resetBoundsOnResize={true}
      >
        {/* <AnyReactComponent
            lat={countryInfo.latitude}
            lng={countryInfo.longitude}
            text="My Marker"
          /> */}
      </GoogleMapReact>
      <Toggle icon="🏥" place="Loca1" idx={1} />
      <Toggle icon="🚓" place="Loca2" idx={2} />
      <Toggle icon="🌐" place="Loca3" idx={3} />
      <MapSidebar />
    </div>
  );
}
