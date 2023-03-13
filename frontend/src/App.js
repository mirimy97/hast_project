import { Canvas } from "@react-three/fiber";
import Earth from "./pages/Earth";
function App() {
  return (
    <>
      <Canvas
        style={{
          background:
            "linear-gradient(180deg, #000000, #000000, #1b004f, #2a005e, #3c006c)",
          width: "100vw",
          height: "100vh",
        }}
      >
        <pointLight position={[10, 10, 10]} />
        <mesh>
          {/* 구 형상 생성 */}
          {/* <sphereBufferGeometry /> */}
          {/* 표면 생상, 재질 지정 */}
          {/* <meshStandardMaterial color="yellow" /> */}
        </mesh>
        <Earth />
      </Canvas>
    </>
  );
}

export default App;
