import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./WorldSidebar.module.css";
import WorldSidebarChartBox from "./WorldSidebarChartBox";
import WorldSidebarInfoBox from "./WorldSidebarInfoBox";

function WorldSidebar({ country }) {
  const flagEndpoint = "/assets/flags";
  const sidebarRef = useRef(null);
  const imageurl = `${flagEndpoint}/${country?.ISO_A2.toLowerCase()}.png`;
  const language = useSelector((state) => state.language.value);
  const nameKo = country?.ADMIN_Ko;
  const nameEn = country?.NAME;

  useEffect(() => {
    sidebarRef.current.scrollTop = 0;
  }, [country]);
  return (
    <>
      {/* 나라이름 */}
      {country ? (
        language == "en" ? (
          <p
            style={{
              backgroundImage: `url(${imageurl})`,
              fontSize:
                nameEn.length >= 9
                  ? nameEn.length >= 14
                    ? "3rem"
                    : "3.5rem"
                  : "4rem",
            }}
            className={styles.namefont}
          >
            {nameEn}
          </p>
        ) : (
          <p
            style={{
              backgroundImage: `url(${imageurl})`,
              fontSize:
                nameKo.length >= 5
                  ? nameKo.length >= 8
                    ? "3rem"
                    : "3.5rem"
                  : "4rem",
            }}
            className={styles.namefont}
          >
            {nameKo}
          </p>
        )
      ) : (
        ""
      )}
      <div ref={sidebarRef} className={styles.sidebarOuterBox}>
        {/* Info Box */}
        {country && (
          <WorldSidebarInfoBox
            GDP={country?.GDP_MD_EST}
            ECONOMY={country?.ECONOMY}
            INCOME_GRP={country?.INCOME_GRP}
            POP_EST={country?.POP_EST}
            CONTINENT={country?.CONTINENT}
            SUBREGION={country?.SUBREGION}
          />
        )}
        <p>📈 한눈에 보기</p>
        <div
          style={{
            width: "100%",
            height: "1000px",
            backgroundColor: "#f6edd5",
            marginBottom: "150px",
          }}
        >
          <WorldSidebarChartBox />
        </div>
      </div>

      <div>
        <button className={styles.travelBtn}>
          <span>{language == "en" ? "TRAVEL" : "여행떠나기"}</span>
        </button>
      </div>
    </>
  );
}

export default WorldSidebar;
