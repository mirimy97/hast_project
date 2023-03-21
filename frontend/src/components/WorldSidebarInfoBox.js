import styles from "./WorldSidebar.module.css";

function WorldSidebarInfoBox({
  GDP,
  INCOME_GRP,
  ECONOMY,
  POP_EST,
  POP_RANK,
  CONTINENT,
  SUBREGION,
}) {
  return (
    <>
      <div className={styles.infobox}>
        {/* 경제수준 */}
        <div className={styles.flex}>
          <img className={styles.icon} src="/assets/3d/man.png"></img>
          <div className={styles.columnCenter}>
            <p className={styles.label}>추정 인구</p>
            <p className={styles.value}>
              {POP_EST}
              <span className={styles.label}> 명</span>
            </p>
          </div>
        </div>
      </div>
      {/* 인구수 */}
      <div className={styles.infobox}>
        <div style={{ justifyContent: "flex-end" }} className={styles.flex}>
          <div style={{ textAlign: "end" }} className={styles.columnCenter}>
            <p className={styles.label}>GDP</p>
            <p className={styles.value}>
              {GDP}
              <span className={styles.label}> M$</span>
            </p>

            <p className={styles.label}>경제분류 : {ECONOMY}</p>
            <p className={styles.label}>소득수준 : {INCOME_GRP}</p>
          </div>
          <img className={styles.icon} src="/assets/3d/coin.png"></img>
        </div>
      </div>
      {/* 대륙 */}
      <div className={styles.infobox}>
        <div className={styles.flex}>
          <img className={styles.icon} src="/assets/3d/location.png"></img>
          <div className={styles.columnCenter}>
            <p className={styles.value}>
              {CONTINENT}, {SUBREGION}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorldSidebarInfoBox;
