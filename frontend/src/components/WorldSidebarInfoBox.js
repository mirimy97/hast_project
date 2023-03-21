import styles from "./WorldSidebar.module.css";
import { useTranslation, withTranslation } from "react-i18next";

function WorldSidebarInfoBox({
  GDP,
  INCOME_GRP,
  ECONOMY,
  POP_EST,
  POP_RANK,
  CONTINENT,
  SUBREGION,
}) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className={styles.infobox}>
        {/* 경제수준 */}
        <div className={styles.flex}>
          <img className={styles.icon} src="/assets/3d/man.png"></img>
          <div className={styles.columnCenter}>
            <p className={styles.label}>{t("nation-info.Population")}</p>
            <p className={styles.value}>
              {POP_EST}
              <span className={styles.label}> {t("nation-info.people")}</span>
            </p>
          </div>
        </div>
      </div>
      {/* 인구수 */}
      <div className={styles.infobox}>
        <div style={{ justifyContent: "flex-end" }} className={styles.flex}>
          <div className={styles.columnCenter}>
            <p className={styles.label}>GDP</p>
            <p className={styles.value}>
              {GDP}
              <span className={styles.label}> M$</span>
            </p>

            <p className={styles.label}>
              {t(`economy.${ECONOMY[0]}`)} , {t(`income.${INCOME_GRP[0]}`)}
            </p>
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
              {t(`continent.${CONTINENT}`)}
              <span style={{ fontSize: "1.1rem", marginLeft: "5px" }}>
                ({t(`continent.${SUBREGION}`)})
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(WorldSidebarInfoBox);
