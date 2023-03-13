// import React, { useEffect, useRef, useState } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three";

// import * as THREE from "three";
// import { OrbitControls, Stars } from "@react-three/drei";

// import EarthDayMap from "../assets/textures/8k_earth_daymap.jpg";
// import EarthNormalMap from "../assets/textures/8k_earth_normal_map.jpg";
// import EarthSpecularMap from "../assets/textures/8k_earth_specular_map.jpg";
// import EarthCloudsMap from "../assets/textures/8k_earth_clouds.jpg";

// import Marker from "./Marker";

// import Globe from "react-globe.gl";
// import World from "./World";
// const markersData = [
//   { latitude: 23.634501, longitude: -102.552784 }, //멕시코
//   { latitude: 35.907757, longitude: 127.766922 }, //우리나라
//   //{ latitude: 80.6345, longitude: 30.5528 },
//   //{ latitude: 35.652832, longitude: 139.839478 },
//   // { latitude: 51.5074, longitude: -0.1278 },
//   // Add more markers here...
// ];

// function Earth() {
//   const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
//     TextureLoader,
//     [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
//   );

//   const earthRef = useRef();
//   const cloudsRef = useRef();

//   useFrame(({ clock }) => {
//     const elapsedTime = clock.getElapsedTime();

//     earthRef.current.rotation.y = elapsedTime / 6;
//     cloudsRef.current.rotation.y = elapsedTime / 6;
//   });

//   return (
//     <>
//       <directionalLight color="#f6f3ea" position={[2, 0, 2]} intensity={1} />
//       <ambientLight intensity={1} />
//       <World />
//       <Stars
//         radius={500}
//         depth={60}
//         count={10000}
//         factor={7}
//         saturation={0}
//         fade={true}
//       />

//       <mesh ref={cloudsRef}>
//         {/* sphereGeometry args={[반지름, 높이, 넓이]} */}
//         <sphereGeometry args={[1.005, 32, 32]} widthSegments={64} />
//         <meshPhongMaterial
//           map={cloudsMap}
//           opacity={0.1}
//           depthWrite={true}
//           transparent={true}
//           side={THREE.DoubleSide}
//         />
//       </mesh>

//       <mesh ref={earthRef}>
//         {/* <sphereGeometry args={[1, 32, 32]} /> */}

//         <meshPhongMaterial specularMap={specularMap} />
//         <meshStandardMaterial
//           map={colorMap}
//           normalMap={normalMap}
//           metalness={0.5}
//           roughness={0.8}
//           side={THREE.DoubleSide}
//         />
//         <OrbitControls
//           enableZoom={true}
//           enablePan={true}
//           enableRotate={true}
//           zoomSpeed={0.6}
//           panSpeed={0.5}
//           rotateSpeed={0.4}
//         />
//         {markersData.map((markerData, index) => (
//           <Marker
//             key={index}
//             latitude={markerData.latitude}
//             longitude={markerData.longitude}
//           />
//         ))}
//       </mesh>
//     </>
//   );
// }

// export default Earth;
