import React, { useEffect, useState } from "react";
import styles from "./CapitalGame.module.css";
const FlagGame = ({ countries, setHoverD }) => {
  const [answers, setAnswers] = useState([0, 0, 0, 0]);
  const [quizData, setQuizData] = useState({ country: "", flag: "" });

  const [showResult, setShowResult] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [onClick, setOnClick] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  let flagArray = countries.features.map((country) => {
    if (country.properties.ISO_A2)
      return Object.assign(country, {
        country: country.properties.ADMIN_Ko,
        flag: country.properties.ISO_A2.toLowerCase(),
      });
  });

  useEffect(() => {
    settingQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //퀴즈에 필요한 데이터 불러오기
  const settingQuizData = () => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      let random = Math.floor(Math.random() * 177);
      if (array.includes(random)) {
        i--;
      } else {
        array.push(random);
      }
    }

    let random = Math.floor(Math.random() * 4);
    let questionData = flagArray[array[random]];
    setHoverD(questionData);
    setQuizData({
      country: questionData.country,
      flag: questionData.flag,
    });
    setAnswers([
      {
        country: flagArray[array[0]].country,
        flag: flagArray[array[0]].flag,
      },
      {
        country: flagArray[array[1]].country,
        flag: flagArray[array[1]].flag,
      },
      {
        country: flagArray[array[2]].country,
        flag: flagArray[array[2]].flag,
      },
      {
        country: flagArray[array[3]].country,
        flag: flagArray[array[3]].flag,
      },
    ]);
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    setOnClick(true);
    if (answer.country === quizData.country) {
      setSelectedAnswer(true);
      console.log("정답!");
      onClickNext();
    } else {
      setSelectedAnswer(false);
      console.log("오답!");
      onClickNext();
    }
  };

  const onClickNext = () => {
    setTimeout(() => {
      settingQuizData();
      setSelectedAnswerIndex(null);
      setResult((prev) =>
        selectedAnswer
          ? {
              ...prev,
              score: prev.score + 10,
              correctAnswers: prev.correctAnswers + 1,
            }
          : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
      );
      setOnClick(false);
      if (activeQuestion !== 9) {
        setActiveQuestion((prev) => prev + 1);
      } else {
        setActiveQuestion(0);
        setShowResult(true);
      }
    }, 800);
  };
  const imgUrl = "assets/flags/" + quizData.flag + ".png";
  return (
    <div className={styles.quiz_container}>
      {!showResult ? (
        <div>
          <div>
            <span className={styles.active_question_no}>
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className={styles.total_question}>/{addLeadingZero(10)}</span>
          </div>
          <h2 className={styles.question}>❓ 이 국기의 나라는 ❓</h2>
          <img src={imgUrl} alt="flag" className={styles.img} />
          <ul>
            {answers.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={index}
                className={
                  selectedAnswerIndex === index
                    ? selectedAnswer
                      ? styles.selected_answer_correct
                      : styles.selected_answer_error
                    : answer.country === quizData.country && onClick
                    ? styles.selected_answer_correct
                    : null
                }
              >
                {answer.country}
              </li>
            ))}
          </ul>
          <div className={styles.flex_center}>
            {selectedAnswer && onClick ? (
              <div className={styles.correctText}>⭕ 정답입니다 ⭕</div>
            ) : onClick ? (
              <div className={styles.errorText}>❌ 오답입니다 ❌</div>
            ) : (
              <div>💬</div>
            )}
            {/* <button
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === 9 ? "Finish" : "Next"}
              </button> */}
          </div>
        </div>
      ) : (
        <div className={styles.result}>
          <h2>국기 퀴즈 결과</h2>
          <h2>{result.score}점 👊</h2>
          <div>
            {result.score > 80 ? (
              <span>당신은 국기천재 !</span>
            ) : result.score > 60 ? (
              <span>나쁘지 않은 점수 !</span>
            ) : (
              <span>공부하세요 !</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagGame;
