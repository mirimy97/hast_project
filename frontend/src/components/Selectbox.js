import React, { useState } from "react";
import styles from "./Selectbox.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const Selectbox = ({ filteredNews, getFilteredNews }) => {
  // 요 카테고리 아이템들 속에는 { 이름과 상태 } 값들이 들어있다
  const category = [
    { name: "최신 순", state: "latest" },
    { name: "위험도 순", state: "dangerous" },
  ];
  //console.log(filteredNews);
  // 셀렉트박스 내 들어갈 초기값 설정
  const [categoryItem, setCategoryItem] = useState(category[0]);

  // 토글설정은 false 로 셀렉트 박스를 닫아놓자
  const [toggle, setToggle] = useState(false);

  //클릭시 마다 호출되는 함수
  function filterCategory(cate) {
    setCategoryItem(cate);
    setToggle(false);

    if (cate.state === "latest") {
      getFilteredNews(sortDate(filteredNews));
    } else {
      getFilteredNews(sortDanger(filteredNews));
    }
  }

  //날짜 정렬해주는 함수
  function sortDate(list) {
    const newlist = list.slice();
    const sorted_list = newlist.sort(function (a, b) {
      return new Date(b.timeStamp) - new Date(a.timeStamp);
    });
    //console.log(sorted_list);
    return sorted_list;
  }

  //위험도 정렬해주는 함수
  function sortDanger(list) {
    const newlist = list.slice();
    const sorted_list = newlist.sort(function (a, b) {
      return b.score - a.score;
    });
    //console.log(sorted_list);
    return sorted_list;
  }

  return (
    <>
      <div
        className={`${styles.selectbox} ${toggle ? styles.open : ""}`} // 토글시 open 클래스를 추가하고 css 를 바꿔주자
        onClick={() => setToggle(!toggle)} // 클릭하면 토글상태값이 변함
      >
        {categoryItem.name}
        {toggle ? (
          <ExpandLessIcon fontSize="inherit" />
        ) : (
          <ExpandMoreIcon fontSize="inherit" />
        )}
      </div>

      {toggle && (
        <div className={styles.selectdropdown}>
          {category.map(
            (
              cate,
              index // 위에서 준비한 카테고리 배열을 매핑돌려서 보여주자
            ) => (
              <div
                className={`${styles.selectdropitem} ${
                  categoryItem.name === cate.name ? styles.selectitem : ""
                }`}
                key={index}
                onClick={() => filterCategory(cate)} // 클릭시 필터 메소드가 실행된다
              >
                {cate.name}
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Selectbox;
