import React, { useState } from "react";
import styles from "./Selectbox.module.css";

const Selectbox = () => {
  // 요 카테고리 아이템들 속에는 { 이름과 상태 } 값들이 들어있다
  const category = [
    { name: "최신 순", state: "latest" },
    { name: "위험도 순", state: "dangerous" },
  ];

  // 셀렉트박스 내 들어갈 초기값 설정
  const [categoryItem, setCategoryItem] = useState(category[0]);

  // 토글설정은 false 로 셀렉트 박스를 닫아놓자
  const [toggle, setToggle] = useState(false);

  function filterCategory(cate) {
    setCategoryItem(cate);
    setToggle(false);
    // ... api 호출
  }
  return (
    <>
      <div
        className={`${styles.selectbox} ${toggle ? styles.open : ""}`} // 토글시 open 클래스를 추가하고 css 를 바꿔주자
        onClick={() => setToggle(!toggle)} // 클릭하면 토글상태값이 변함
      >
        {categoryItem.name}
        {/* <img src={arrow} /> */}
      </div>
      {toggle && (
        <div className={styles.selectdropdown}>
          {category.map(
            (
              cate,
              index // 위에서 준비한 카테고리 배열을 매핑돌려서 보여주자
            ) => (
              <div
                className={styles.selectitem}
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
