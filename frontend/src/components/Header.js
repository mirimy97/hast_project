import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { lanen, lanko } from "../redux/language";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

function Header(props) {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.status.isMobile);
  const language = useSelector((state) => state.language.value);
  const { t, i18n } = useTranslation();

  // //laguage 선택
  const [isKorean, setIsKorean] = useState(language);
  const [isOpen, setIsOpen] = useState(false);
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };
  const handleEn = () => {
    dispatch(lanen());
    //setLanguage(newAlignment);
    setIsKorean("en");
    //언어변경
    i18n.changeLanguage("en");
  };
  const handleKo = () => {
    dispatch(lanko());
    setIsKorean("ko");
    i18n.changeLanguage("ko");
  };

  // 뒤로가기 클릭 시 (나가기)
  const backBtn = () => {
    props.globeRef.current.resumeAnimation();
    props.setPoint({
      altitude: 2.5,
    });
    props.setSidebarD(-500);
    props.setSidebarMbottom("-100vh");
    props.setLeft(-250);
    props.setClickD(null);
    setTimeout(function () {
      props.setIsDpChart(false);
      props.setSidebarC(null);
    }, 500);
  };

  // useEffect(() => {
  //   // load Topics
  //   axios.get("http://j8e106.p.ssafy.io:8080/api/articles").then((res) => {
  //     if (res.data.resultCode === "SUCCESS") {
  //       console.log(res.data);
  //       setTopics(res.data.result);
  //     }
  //   });
  // }, []);

  const navigate = useNavigate();
  const changePg = () => {
    navigate("/game");
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.flex}>
      <div style={isMobile ? {} : { width: "25%" }}>
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
          <img className={styles.globe} src="/assets/logo/globe2.jpg" />
          <div onClick={handleKo} className={styles.landiv}>
            <motion.div
              className="box"
              initial={{ x: 0 }}
              animate={{
                x: isKorean === "ko" ? 0 : isMobile ? 32 : 70,
              }}
            >
              <p
                className={styles.lan}
                style={{ color: isKorean === "ko" ? "#e5e5e5" : "#7b7b7b" }}
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
                x: isKorean === "ko" ? 0 : isMobile ? -32 : -70,
              }}
            >
              <p
                className={styles.lan}
                style={{ color: isKorean === "ko" ? "#7b7b7b" : "#e5e5e5" }}
              >
                {isMobile ? "En" : "English"}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <div style={isMobile ? { width: "50%" } : { width: "25%" }}>
        {props.clickD ? (
          // <Button variant="outlined" className={styles.button} onClick={backBtn}>
          //   뒤로가기
          // </Button>
          <CloseIcon onClick={backBtn} className={styles.close} />
        ) : (
          <>
            <img
              className={isMobile ? styles.cardM : styles.card}
              src="/assets/3d/card.png"
              alt="game"
              onClick={changePg}
            />
            {/* <img
              className={styles.card}
              src="/assets/3d/key.png"
              alt="game"
              onClick={handleOpen}
            > */}
            <div className={styles.ticker}>
              {/* <div className={styles.newstitle} onClick={handleOpen}>
                {t("header.Topic")}
              </div> */}
              <img
                className={isMobile ? styles.cardM : styles.card}
                src="/assets/3d/key.png"
                alt="key"
                onClick={handleOpen}
              />
              <motion.nav
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                className={isMobile ? styles.tickerboxM : styles.tickerbox}
              >
                <li>{t("headerContent.Con1")}</li>
                <li>{t("headerContent.Con2")}</li>
                <li>{t("headerContent.Con3")}</li>
                <li>{t("headerContent.Con4")}</li>
                <li>{t("headerContent.Con5")}</li>
              </motion.nav>
            </div>
            {/* </img> */}
          </>
        )}
      </div>
    </div>
  );
}

export default withTranslation()(Header);
