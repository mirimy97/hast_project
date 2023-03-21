import { Button } from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import styles from "./MapSidebar.module.css";
import NewsListItem from "./NewsListItem";
function MapSidebar() {
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

  //뉴스 리스트 불러오기
  const newslist = [
    {
      headline: "애플페이 첫날부터 '삐걱'",
      timeStamp: "2023-03-21 13:20:30",
      imgUrl:
        "http://img.tvchosun.com/sitedata/image/202303/21/2023032190102_0.jpg",
      articleUrl:
        "http://news.tvchosun.com/site/data/html_dir/2023/03/21/2023032190102.html",
      category: 1,
    },
    {
      headline: "애플페이 첫날부터 '삐걱'",
      timeStamp: "2023-03-21 13:20:30",
      imgUrl:
        "http://img.tvchosun.com/sitedata/image/202303/21/2023032190102_0.jpg",
      articleUrl:
        "http://news.tvchosun.com/site/data/html_dir/2023/03/21/2023032190102.html",
      category: 1,
    },
    {
      headline: "애플페이 첫날부터 '삐걱'",
      timeStamp: "2023-03-21 13:20:30",
      imgUrl:
        "http://img.tvchosun.com/sitedata/image/202303/21/2023032190102_0.jpg",
      articleUrl:
        "http://news.tvchosun.com/site/data/html_dir/2023/03/21/2023032190102.html",
      category: 1,
    },
    {
      headline: "애플페이 첫날부터 '삐걱'",
      timeStamp: "2023-03-21 17:20:10",
      imgUrl:
        "http://img.tvchosun.com/sitedata/image/202303/21/2023032190102_0.jpg",
      articleUrl:
        "http://news.tvchosun.com/site/data/html_dir/2023/03/21/2023032190102.html",
      category: 1,
    },
  ];

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

  const [filtredNews, setFiltredNews] = useState(null);
  const [selectBtn, setSelectBtn] = useState(null);

  useEffect(() => {
    setFiltredNews(getNews());
  }, []);

  function selectNews(cate) {
    let categoryNum = cate.substr(4, 4);
    setFiltredNews(filterNews(categoryNum));
    setSelectBtn(null);
    setSelectBtn(categoryNum);
  }

  return (
    <div className={styles.sidebar}>
      <h3>📰 {t("categoryTitle.Title")}</h3>
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
      <div>
        {filtredNews &&
          filtredNews.map((news, index) => (
            <NewsListItem key={index} news={news} />
          ))}
      </div>
    </div>
  );
}

export default MapSidebar;
