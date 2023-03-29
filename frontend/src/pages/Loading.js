import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Loading.module.css";

function Loading() {
  const isMobile = useSelector((state) => state.isMobile.isMobile);
  const [text, setText] = useState("");
  useState(() => {
    setText("H");
  }, []);
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#323232" }}>
      {isMobile ? (
        <img
          src="/assets/loading.gif"
          style={{
            width: "350px",
            height: "250px",
            marginLeft: "calc(50% - 175px)",
            marginTop: "calc(50vh - 150px)",
          }}
        />
      ) : (
        <img
          src="/assets/loading.gif"
          style={{
            width: "550px",
            height: "420px",
            marginLeft: "calc(50% - 275px)",
            marginTop: "calc(50vh - 210px)",
          }}
        />
      )}
      <div
        className={
          isMobile
            ? `${styles.geeks} ${styles.mobile}`
            : `${styles.geeks} ${styles.pc}`
        }
      >
        <span>H</span>
        <span>a</span>
        <span>v</span>
        <span>e </span>
        <span> A </span>
        <span> S</span>
        <span>a</span>
        <span>f</span>
        <span>e </span>
        <span> T</span>
        <span>r</span>
        <span>i</span>
        <span>p</span>
      </div>
    </div>
  );
}

export default Loading;
