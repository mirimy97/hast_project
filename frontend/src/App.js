import { useMediaQuery } from "react-responsive";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Earth from "./pages/Earth";
import World from "./pages/World";
import WorldDetail from "./pages/WorldDetail";
import Map from "./pages/Map";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMobile } from "./redux/isMobile";

const theme = createTheme({
  typography: {
    fontFamily: `"Pretendard-Regular"`,
    fontSize: 20,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  const dispatch = useDispatch();
  // browser size에 따라 true / false 할당
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [isMobile, dispatch]);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
