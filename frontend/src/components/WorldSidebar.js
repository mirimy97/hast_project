import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./WorldSidebar.module.css";
import WorldSidebarInfoBox from "./WorldSidebarInfoBox";

function WorldSidebar({ country }) {
  const flagEndpoint = "/assets/flags";
  const imageurl = `${flagEndpoint}/${country?.ISO_A2.toLowerCase()}.png`;
  const language = useSelector((state) => state.language.value);
  const nameKo = country?.ADMIN_Ko;
  const nameEn = country?.NAME;
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
        style={{ width: "100%", height: "1000px", backgroundColor: "#f6edd5" }}
      >
        차트
      </div>
    </>
  );
}

export default WorldSidebar;
