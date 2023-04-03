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

  const { t, i18n } = useTranslation();
  // //laguage 선택
  const [isKorean, setIsKorean] = useState(true);

  const [topics, setTopics] = useState("");

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

  useEffect(() => {
    // load Topics
    axios
      .get("http://j8e106.p.ssafy.io:8080/api/articles/updates")
      .then((res) => {
        if (res.data.resultCode === "SUCCESS") {
          setTopics(res.data.result);
        }
      });
  }, []);

  const navigate = useNavigate();
  const changePg = () => {
    navigate("/game");
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
                x: isKorean ? 0 : isMobile ? 32 : 70,
              }}
            >
              <p
                className={styles.lan}
                style={{ color: isKorean ? "#e5e5e5" : "#7b7b7b" }}
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
                x: isKorean ? 0 : isMobile ? -32 : -70,
              }}
            >
              <p
                className={styles.lan}
                style={{ color: isKorean ? "#7b7b7b" : "#e5e5e5" }}
              >
                {isMobile ? "En" : "English"}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <div style={isMobile ? { width: "100%" } : { width: "50%" }}>
        {props.clickD ? (
          <div style={{ position: "absolute" }}></div>
        ) : isMobile ? (
          <div className={styles.tickerM}>
            <ul className={styles.ulM}>
              {topics &&
                topics.map((t) => (
                  <li>{isKorean ? t.korKeyword : t.engKeyword}</li>
                ))}
            </ul>
          </div>
        ) : (
          /* &#128204; {t("header.Topic")} */
          <div className={styles.ticker}>
            <div className={styles.newstitle}>{t("header.Topic")} </div>

            <ul className={styles.ul}>
              {topics &&
                topics.map((t) => (
                  <li>{isKorean ? t.korKeyword : t.engKeyword}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div style={isMobile ? { width: "65px" } : { width: "25%" }}>
        {props.clickD ? (
          // <Button variant="outlined" className={styles.button} onClick={backBtn}>
          //   뒤로가기
          // </Button>
          <CloseIcon onClick={backBtn} className={styles.close} />
        ) : (
          <img
            className={styles.card}
            src="/assets/3d/card.png"
            alt="game"
            onClick={changePg}
          ></img>
          // <img className={styles.icon} src="/assets/3d/airplane.png"></img>
        )}
      </div>
    </div>
  );
}

export default withTranslation()(Header);
