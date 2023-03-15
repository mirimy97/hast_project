import { useCallback, useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import Globe from "react-globe.gl";
import axios from "axios";

function World() {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  const getGeoJson = () => {
    return axios
      .get("geojson/ne_110m_admin_0_countries.geojson")
      .then((res) => res.data);
  };

  useEffect(() => {
    const loadData = async () => {
      // load data
      const data = await getGeoJson();
      setCountries(data);
    };

    // call async function
    loadData();
  }, []);

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );

  useEffect(() => {
    console.log(countries);

    colorScale.domain([0, maxVal]);
  }, [countries]);

  // const clickRegion = useCallback(({ lat: endLat, lng: endLng }) => {
  //   const { lat: startLat, lng: startLng } = prevCoords.current;
  //   prevCoords.current = { lat: endLat, lng: endLng };

  //   // add and remove arc after 1 cycle
  //   const arc = { startLat, startLng, endLat, endLng };
  //   setArcsData(curArcsData => [...curArcsData, arc]);
  //   setTimeout(() => setArcsData(curArcsData => curArcsData.filter(d => d !== arc)), FLIGHT_TIME * 2);

  //   // add and remove start rings
  //   const srcRing = { lat: startLat, lng: startLng };
  //   setRingsData(curRingsData => [...curRingsData, srcRing]);
  //   setTimeout(() => setRingsData(curRingsData => curRingsData.filter(r => r !== srcRing)), FLIGHT_TIME * ARC_REL_LEN);

  //   // add and remove target rings
  //   setTimeout(() => {
  //     const targetRing = { lat: endLat, lng: endLng };
  //     setRingsData(curRingsData => [...curRingsData, targetRing]);
  //     setTimeout(() => setRingsData(curRingsData => curRingsData.filter(r => r !== targetRing)), FLIGHT_TIME * ARC_REL_LEN);
  //   }, FLIGHT_TIME);
  // }, []);
  const flagEndpoint = "https://corona.lmao.ninja/assets/img/flags";

  return (
    <>
      {countries.features && (
        <Globe
          globeImageUrl="map/8k_earth_daymap.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          lineHoverPrecision={0}
          polygonsData={countries.features.filter(
            (d) => d.properties.ISO_A2 !== "AQ"
          )}
          polygonAltitude={(d) => (d === hoverD ? 0.03 : 0)}
          // polygonCapColor={(d) =>
          //   d === hoverD ? "steelblue" : colorScale(getVal(d))
          // }

          polygonCapColor={(d) => (d === hoverD ? "#7cc2b870" : "#ffffff00")}
          polygonSideColor={() => "#ffffff00"}
          polygonStrokeColor={() => "#00000080"}
          polygonLabel={
            ({ properties: d }) =>
              `
              <img src="${flagEndpoint}/${d.ISO_A2.toLowerCase()}.png" alt="flag" />
              <h1 style="color: yellow;">${d.ADMIN} (${d.ISO_A2}): </h1>
              GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
              Population: <i>${d.POP_EST}</i>
            `
            //console.log(d)
            //countryName(d)
          }
          onPolygonHover={setHoverD}
          polygonsTransitionDuration={300}
          onPolygonClick={(polygon) => global.console.log("polygon", polygon)}
        />
      )}
    </>
  );
}

export default World;
