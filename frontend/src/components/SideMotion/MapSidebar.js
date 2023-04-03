import { Button } from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import styles from "./MapSidebar.module.css";
import NewsListItem from "../NewsListItem";
import Selectbox from "../Selectbox";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { motion } from "framer-motion";
import axios from "axios";

function MapSidebar({allNews, setAllNews, clickCoords}) {
  //(정적인) 버튼 값
  const buttons = [
    {
      name: "categoryBtn",
      value: "Cate1",
    },
    {
      name: "categoryBtn",
      value: "Cate2",
    },
    {
      name: "categoryBtn",
      value: "Cate3",
    },
    {
      name: "categoryBtn",
      value: "Cate4",
    },
    {
      name: "categoryBtn",
      value: "Cate5",
    },
  ];

  // 클릭 좌표 변경 시 마다 기사 업데이트
  useEffect(() => {
    if (clickCoords !== null) {
      // 해당 좌표의 반경 ~에 해당하는 기사를 긁어오기 (api 요청 필요)
      axios.get(`http://j8e106.p.ssafy.io:8080/api/articles/${clickCoords.lat}/${clickCoords.lng}`)
        .then(res => {
          if (res.data.resultCode === "SUCCESS") {
            setAllNews(res.data.result)
          }
        })
        .catch(err => console.log(err))
    }
  }, [clickCoords])


  const [filteredNews, setFilteredNews] = useState(null);
  const [selectBtn, setSelectBtn] = useState(null);

  //모든 뉴스 리스트 불러오기
  function getNews() {
    const newsList = allNews;
    return newsList;
  }
  //뉴스 카테고리별 필터링
  function filterNews(categoryNum) {
    let filtredCategory = getNews().filter(
      (news) => news.category == categoryNum
    );
    return filtredCategory;
  }

  useEffect(() => {
    setFilteredNews(getNews());
  }, [allNews]);

  //카테고리 선택
  function selectNews(cate) {
    let categoryNum = cate.substr(4, 4);
    setFilteredNews(filterNews(categoryNum));
    setSelectBtn(null);
    setSelectBtn(categoryNum);
  }
  //최신순 위험도순 정렬
  const getFilteredNews = (news) => {
    setFilteredNews(news);
  };

  return (
    // <div className={styles.sidebar}>
    <>
      {buttons &&
        buttons.map((news, index) => (
          <>
            <button
              key={index}
              className={`${styles.button}  
                ${
                  selectBtn == news.value.substr(4, 4)
                    ? styles.buttonSelect
                    : ""
                }`}
              value={news.value}
              onClick={() => selectNews(news.value)}
            >
              {t(news.name + "." + news.value)}
            </button>
          </>
        ))}
      <div className={styles.select}>
        <Selectbox
          filteredNews={filteredNews}
          getFilteredNews={getFilteredNews}
        />
      </div>
      <div>
        {filteredNews &&
          filteredNews.map((news, index) => (
            <NewsListItem key={index} news={news} />
          ))}
      </div>
    </>
    // </div>
  );
}

export default MapSidebar;
