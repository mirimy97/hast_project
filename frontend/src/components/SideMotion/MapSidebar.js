import { Button } from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import styles from "./MapSidebar.module.css";
import NewsListItem from "../NewsListItem";
import Selectbox from "../Selectbox";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { motion } from "framer-motion";
function MapSidebar({ newslist }) {
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
    {
      name: "categoryBtn",
      value: "Cate6",
    },
  ];

  //뉴스 리스트 불러오기
  // const newslist = [
  //   {
  //     headline: "애플페이 첫날부터 '삐걱'",
  //     timeStamp: "2023-03-20 13:20:30",
  //     imgUrl:
  //       "http://img.tvchosun.com/sitedata/image/202303/21/2023032190102_0.jpg",
  //     articleUrl:
  //       "http://news.tvchosun.com/site/data/html_dir/2023/03/21/2023032190102.html",
  //     category: 1,
  //     score: 3.0,
  //   },
  //   {
  //     headline: "애플페이 첫날부터 '삐걱'",
  //     timeStamp: "2023-03-19 13:20:30",
  //     imgUrl:
  //       "http://img.tvchosun.com/sitedata/image/202303/21/2023032190102_0.jpg",
  //     articleUrl:
  //       "http://news.tvchosun.com/site/data/html_dir/2023/03/21/2023032190102.html",
  //     category: 1,
  //     score: 4.2,
  //   },
  //   {
  //     headline: "애플페이 첫날부터 '삐걱'",
  //     timeStamp: "2023-03-21 13:20:30",
  //     imgUrl:
  //       "http://img.tvchosun.com/sitedata/image/202303/21/2023032190102_0.jpg",
  //     articleUrl:
  //       "http://news.tvchosun.com/site/data/html_dir/2023/03/21/2023032190102.html",
  //     category: 1,
  //     score: 3.1,
  //   },
  //   {
  //     headline: "애플페이 첫날부터 '삐걱'",
  //     timeStamp: "2023-03-22 17:20:10",
  //     imgUrl:
  //       "http://img.tvchosun.com/sitedata/image/202303/21/2023032190102_0.jpg",
  //     articleUrl:
  //       "http://news.tvchosun.com/site/data/html_dir/2023/03/21/2023032190102.html",
  //     category: 1,
  //     score: 4.0,
  //   },
  //   {
  //     headline: "애플페이 첫날부터 '삐걱'2",
  //     timeStamp: "2023-03-18 17:20:10",
  //     imgUrl:
  //       "http://img.tvchosun.com/sitedata/image/202303/21/2023032190102_0.jpg",
  //     articleUrl:
  //       "http://news.tvchosun.com/site/data/html_dir/2023/03/21/2023032190102.html",
  //     category: 2,
  //     score: 3.5,
  //   },
  // ];

  const [filteredNews, setFilteredNews] = useState(null);
  const [selectBtn, setSelectBtn] = useState(null);

  //모든 뉴스 리스트 불러오기
  function getNews() {
    const newsList = newslist;
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
  }, []);

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
      {/* <KeyboardDoubleArrowRightIcon /> */}
      {/* <h3 className={styles.h3}>📰 {t("categoryTitle.Title")}</h3> */}
      {buttons &&
        buttons.map((news, index) => (
          <>
            <button
              key={index}
              className={`${styles.button}  
                ${
                  selectBtn === news.value.substr(4, 4)
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
