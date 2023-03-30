import React from "react";
import styles from "./GameResult.module.css";

const GameResult = ({ option, result }) => {
  return (
    <div className={styles.result}>
      <div className={styles.resultTitle}>
        <img src="/assets/3d/score.png" />
        <h1 className={styles.h1}>{option} 퀴즈 결과</h1>
      </div>
      <h1>{result.score}점</h1>
      <h2 className={styles.flex}>
        <div>
          총 <span className={styles.span}>10문제</span> 중
        </div>
        <div>
          <span className={styles.span}>{result.correctAnswers}문제</span>를
          맞혔어요
        </div>
      </h2>
      <div>
        {result.score > 70 ? (
          <img className={styles.img} src="/assets/3d/result3.png" />
        ) : result.score >= 55 ? (
          <img className={styles.img} src="/assets/3d/result2.png" />
        ) : (
          <>
            <img className={styles.img} src="/assets/3d/result1.png" />
          </>
        )}
      </div>
    </div>
  );
};

export default GameResult;
