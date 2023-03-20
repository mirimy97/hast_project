import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { lanen, lanko } from "../redux/language";
import styles from "./Header.module.css";

function Header(props) {
  const dispatch = useDispatch();
  const handleEn = () => dispatch(lanen());
  const handleKo = () => dispatch(lanko());

  const { t, i18n } = useTranslation();
  // //laguage 선택
  const [language, setLanguage] = useState("ko");

  const changeLanguage = (e, newAlignment) => {
    setLanguage(newAlignment);
    //언어변경
    i18n.changeLanguage(newAlignment);
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
  };
  return (
    <div className={styles.flex}>
      {props.clickD ? (
        <Button variant="outlined" className={styles.button} onClick={backBtn}>
          뒤로가기
        </Button>
      ) : (
        <div></div>
      )}
      <div>&#128204; {t("header.Topic")}</div>
      <div>
        {/* <span>
          <img className={styles.img} src="/assets/earth.png" alt="배너1" /> KO
          |{" "}
        </span>
        <span>EN</span> */}
        <ToggleButtonGroup
          color="primary"
          exclusive
          aria-label="text alignment"
          value={language}
          onChange={changeLanguage}
        >
          <ToggleButton value="ko" aria-label="centered" onClick={handleKo}>
            🇰🇷 KO
            {/* <FormatAlignLeftIcon /> */}
          </ToggleButton>
          <ToggleButton value="en" aria-label="centered" onClick={handleEn}>
            🇺🇸 EN
            {/* <FormatAlignCenterIcon /> */}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

export default withTranslation()(Header);
