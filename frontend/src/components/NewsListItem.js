import React from "react";
import styles from "./NewsListItem.module.css";
import { t } from "i18next";
import { useSelector } from "react-redux";

function NewsListItem(props) {
  const language = useSelector((state) => state.language.value);
  //방금전, ~분전, ~시간전 설정
  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return t("newsList.justBefore");
    if (betweenTime < 60) {
      return `${betweenTime} ${t("newsList.minutesAgo")}`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour} ${t("newsList.hoursAgo")}`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay} ${t("newsList.daysAgo")}`;
    }
  }

  const timebefore = timeForToday(props.news.timeStamp);
  const timeStamp = props.news.timeStamp.split("T");
  return (
    <div className={styles.flex}>
      <div>
        <span className={styles.time}>🕛 {timebefore} </span>
        <a className={styles.ahref} href={props.news.url} target="_blank">
          <div className={styles.headline}>
            {language === "en" ? props.news.engKeyword : props.news.korKeyword}
          </div>
        </a>
        <div className={styles.score}>
          {t("newsList.danger")} {props.news.score.toFixed(2)}
        </div>
        <span className={styles.timestamp}>
          {timeStamp[0]} {timeStamp[1]}
        </span>
      </div>
      <div className={styles.imgbox}>
        <img
          referrerpolicy="no-referrer"
          className={styles.img}
          alt="img"
          src={props.news.imgUrl ? props.news.imgUrl : "/assets/news.png"}
          onError={(e) => {
            e.target.src = "/assets/news.png";
          }}
        />
      </div>
    </div>
  );
}

export default NewsListItem;
