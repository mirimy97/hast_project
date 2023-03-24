import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { lanen, lanko } from "../redux/language";
import styles from "./Header.module.css";
import { color, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

function Header(props) {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile.isMobile);

  const { t, i18n } = useTranslation();
  // //laguage 선택
  const [language, setLanguage] = useState("ko");

  const [isKorean, setIsKorean] = useState(true);

  const handleEn = () => {
    dispatch(lanen());
    //setLanguage(newAlignment);
    setIsKorean(false);
    //언어변경
    i18n.changeLanguage("en");
  };
  const handleKo = () => {
    dispatch(lanko());
    setIsKorean(true);
    i18n.changeLanguage("ko");
  };

  // 뒤로가기 클릭 시 (나가기)
  const backBtn = () => {
    props.globeRef.current.resumeAnimation();
    props.setClickD(null);
    props.setPoint({
      altitude: 2.5,
    });
    props.setLeft(0);
    props.setSidebarD(-500);
    props.setSidebarMbottom("-100vh");
  };
  return (
    <div className={styles.flex}>
      <div>
        {/* <span>
          <img className={styles.img} src="/assets/earth.png" alt="배너1" /> KO
          |{" "}
        </span>
        <span>EN</span> */}

        {/* <ToggleButtonGroup
          color="primary"
          exclusive
          aria-label="text alignment"
          value={language}
          onChange={changeLanguage}
        >
          <ToggleButton value="ko" aria-label="centered" onClick={handleKo}>
            <img src="/assets/logo/ko.png" />
          </ToggleButton>
          <ToggleButton value="en" aria-label="centered" onClick={handleEn}>
            <img src="/assets/logo/en.png" />
          </ToggleButton>
        </ToggleButtonGroup> */}

        <div className={styles.language}>
          <img className={styles.globe} src="/assets/logo/globe.png" />
          <div onClick={handleKo} className={styles.landiv}>
            <motion.div
              className="box"
              initial={{ x: 0 }}
              animate={{
                x: isKorean ? 0 : isMobile ? 35 : 78,
              }}
            >
              <p
                className={styles.lan}
                style={{ color: isKorean ? "" : "#7b7b7b" }}
              >
                {isMobile ? "Ko" : "Korean"}
              </p>
            </motion.div>
          </div>
          <div className={styles.line}>|</div>
          <div onClick={handleEn} className={styles.landiv}>
            <motion.div
              className="box"
              initial={{ x: 0 }}
              animate={{
                x: isKorean ? 0 : isMobile ? -35 : -78,
              }}
            >
              <p
                className={styles.lan}
                style={{ color: isKorean ? "#7b7b7b" : "" }}
              >
                {isMobile ? "En" : "English"}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <div>
        {props.clickD ? (
          <div style={{ position: "absolute" }}></div>
        ) : isMobile ? (
          <div className={styles.tickerM}>
            <ul className={styles.ulM}>
              <li>Hello News!</li>
              <li>Hello News!</li>
              <li>Hello News!</li>
              <li>Hello News!</li>
              <li>Hello News!</li>
            </ul>
          </div>
        ) : (
          /* &#128204; {t("header.Topic")} */
          <div className={styles.ticker}>
            <div className={styles.newstitle}>{t("header.Topic")} </div>
            <ul className={styles.ul}>
              <li>Hello News!</li>
              <li>Hello News!</li>
              <li>Hello News!</li>
              <li>Hello News!</li>
              <li>Hello News!</li>
            </ul>
          </div>
        )}
      </div>
      <div>
        {props.clickD ? (
          // <Button variant="outlined" className={styles.button} onClick={backBtn}>
          //   뒤로가기
          // </Button>
          <CloseIcon onClick={backBtn} />
        ) : (
          <div></div>
          // <img className={styles.icon} src="/assets/3d/airplane.png"></img>
        )}
      </div>
    </div>
  );
}

export default withTranslation()(Header);
