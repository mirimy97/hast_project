import styles from "./WorldSidebar.module.css";
import { useTranslation, withTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function WorldSidebarInfoBox({
  GDP,
  INCOME_GRP,
  ECONOMY,
  POP_EST,
  CONTINENT,
  SUBREGION,
}) {
  const { t } = useTranslation();
  const isMobile = useSelector((state) => state.status.isMobile);

  return (
    <>
      <div className={styles.infoOuter}>
        {/* 경제수준 */}
        <div className={styles.infoboxC}>
          <img className={styles.icon} src="/assets/3d/man.png"></img>

          <p className={styles.label} style={{ marginTop: "20px" }}>
            {t("nation-info.Population")}
          </p>
          <p className={styles.value}>
            {POP_EST.toLocaleString("en-US")}
            <span className={styles.subtext}> {t("nation-info.people")}</span>
          </p>
        </div>
        {/* 인구수 */}
        <div className={styles.infoboxC}>
          <img className={styles.icon} src="/assets/3d/coin.png"></img>
          <p className={styles.label} style={{ marginTop: "10px" }}>
            GDP
          </p>
          <p className={styles.value}>
            {GDP.toLocaleString("en-US")}
            <span className={styles.subtext}> M$</span>
          </p>
          <p className={styles.subtext}>{t(`economy.${ECONOMY[0]}`)}</p>
          <p className={styles.subtext}>{t(`income.${INCOME_GRP[0]}`)}</p>
        </div>
      </div>
      {/* 대륙 */}
      <div className={styles.infobox}>
        <img className={styles.icon} src="/assets/3d/location.png"></img>

        <div className={styles.columnCenter}>
          <p className={styles.value}>{t(`continent.${CONTINENT}`)}</p>
          <p
            style={{ fontSize: "1rem", marginLeft: "5px" }}
            className={styles.value}
          >
            ({t(`continent.${SUBREGION}`)})
          </p>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(WorldSidebarInfoBox);
