import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Game.module.css";
import GameResult from "./GameResult";
function CapitalGame({ countries, hoverD, changeHover }) {
  const [answers, setAnswers] = useState([0, 0, 0, 0]);
  const [quizData, setQuizData] = useState({ country: "", capital: "" });
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

  //모바일 여부
  const isMobile = useSelector((state) => state.status.isMobile);

  //퀴즈에 필요한 데이터 불러오기
  const settingQuizData = () => {
    let capitalArray = countries.features.map((country) => {
      if (country.properties.CAPITAL_Ko)
        return Object.assign(country, {
          country: country.properties.ADMIN_Ko,
          capital: country.properties.CAPITAL_Ko,
        });
    });

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
    let questionData = capitalArray[array[random]];
    changeHover(questionData);
    setQuizData({
      country: questionData.country,
      capital: questionData.capital,
    });
    setAnswers([
      {
        country: capitalArray[array[0]].country,
        capital: capitalArray[array[0]].capital,
      },
      {
        country: capitalArray[array[1]].country,
        capital: capitalArray[array[1]].capital,
      },
      {
        country: capitalArray[array[2]].country,
        capital: capitalArray[array[2]].capital,
      },
      {
        country: capitalArray[array[3]].country,
        capital: capitalArray[array[3]].capital,
      },
    ]);
  };

  useEffect(() => {
    settingQuizData();
  }, []);

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
        changeHover();
      }
    }, 800);
  };
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
          <h2 className={styles.question}>{quizData.country}의 수도는 ❓</h2>
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
                {answer.capital}
              </li>
            ))}
          </ul>
          <div className={styles.flex_center}>
            {selectedAnswer && onClick ? (
              <div className={styles.correctText}>정답입니다 😍</div>
            ) : onClick ? (
              <div className={styles.errorText}>오답입니다 😥</div>
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
        <GameResult option="수도" result={result} />
      )}
    </div>
  );
}

export default CapitalGame;
