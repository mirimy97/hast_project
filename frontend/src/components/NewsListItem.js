import React from "react";
import styles from "./NewsListItem.module.css";

function NewsListItem(props) {
  //방금전, ~분전, ~시간전 설정
  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  const timebefore = timeForToday(props.news.timeStamp);

  return (
    <div className={styles.flex}>
      <div>
        <span className={styles.time}>🕛 {timebefore} </span>
        <a href={props.news.articleUrl} target="_blank">
          <div className={styles.headline}>{props.news.headline}</div>
        </a>
        <div className={styles.score}>☠︎ 위험도 {props.news.score}</div>
        <span className={styles.timestamp}>{props.news.timeStamp}</span>
      </div>
      <div className={styles.imgbox}>
        <img className={styles.img} alt="img" src={props.news.imgUrl} />
      </div>
    </div>
  );
}

export default NewsListItem;
