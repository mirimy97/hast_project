import React from "react";
import { useNavigate } from "react-router";
import styles from "./Header.module.css";
const HeaderGame = () => {
  const navigate = useNavigate();
  const changePg = () => {
    navigate("/");
  };
  return (
    <div className={styles.header} onClick={changePg}>
      <img
        className={`${styles.card} ${styles.cardmargin}`}
        src="/assets/3d/card.png"
      />
    </div>
  );
};

export default HeaderGame;
