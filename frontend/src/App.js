import { Canvas } from "@react-three/fiber";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Earth from "./pages/Earth";
import World from "./pages/World";
import WorldDetail from "./pages/WorldDetail";
import Map from "./pages/Map";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    // <Canvas
    //   style={{
    //     background:
    //       "linear-gradient(180deg, #000000, #000000, #1b004f, #2a005e, #3c006c)",
    //     width: "100vw",
    //     height: "100vh",
    //   }}
    // >
    //   <pointLight position={[10, 10, 10]} />
    //   <mesh>
    //     {/* 구 형상 생성 */}
    //     {/* <sphereBufferGeometry /> */}
    //     {/* 표면 생상, 재질 지정 */}
    //     {/* <meshStandardMaterial color="yellow" /> */}
    //   </mesh>
    //   <Earth />
    // </Canvas>
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Routes>
          {/* 지구 메인 */}
          <Route path="/" element={<World />} />
          {/* 지구 상세 페이지 */}
          <Route path="/worlddetail" element={<WorldDetail />} />
          {/* 지도 페이지 */}
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
