import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./WorldSidebar.module.css";
import WorldSidebarChartBox from "./WorldSidebarChartBox";
import WorldSidebarInfoBox from "./WorldSidebarInfoBox";

function WorldSidebar({ country, isDpChart, bbox }) {
  const isMobile = useSelector((state) => state.status.isMobile);
  const flagEndpoint = "/assets/flags";
  const imageurl = `${flagEndpoint}/${country?.ISO_A2.toLowerCase()}.png`;
  const language = useSelector((state) => state.language.value);
  const nameKo = country?.ADMIN_Ko;
  const nameEn = country?.NAME;
  const [countryInfo, setCountryInfo] = useState("");

  useEffect(() => {
    if (country && bbox) {
      setCountryInfo({
        country: country.ISO_A2,
        FIPS: country.FIPS_10_,
        ne: {
          lat: bbox[3],
          lng: bbox[2],
        },
        sw: {
          lat: bbox[1],
          lng: bbox[0],
        },
      });
    }
  }, [country, bbox]);

  const navigate = useNavigate();
  const clickTravelBtn = () => {
    navigate("/map", { state: { countryInfo: countryInfo } });
  };

  return (
    <>
      {/* 나라이름 */}
      {country ? (
        language === "en" ? (
          <p
            style={
              isMobile
                ? {
                    backgroundImage: `url(${imageurl})`,
                    fontSize:
                      nameEn.length >= 8
                        ? nameEn.length >= 12
                          ? "2rem"
                          : "2.5rem"
                        : "3.5rem",
                  }
                : {
                    backgroundImage: `url(${imageurl})`,
                    fontSize:
                      nameEn.length >= 9
                        ? nameEn.length >= 14
                          ? "3rem"
                          : "3.5rem"
                        : "4rem",
                  }
            }
            className={styles.namefont}
          >
            {nameEn}
          </p>
        ) : (
          <p
            style={
              isMobile
                ? {
                    backgroundImage: `url(${imageurl})`,
                    fontSize:
                      nameKo.length >= 5
                        ? nameKo.length >= 8
                          ? "2rem"
                          : "2.5rem"
                        : "3rem",
                  }
                : {
                    backgroundImage: `url(${imageurl})`,
                    fontSize:
                      nameKo.length >= 5
                        ? nameKo.length >= 8
                          ? "3rem"
                          : "3.5rem"
                        : "4rem",
                  }
            }
            className={styles.namefont}
          >
            {nameKo}
          </p>
        )
      ) : (
        ""
      )}
      <div
        className={styles.sidebarOuterBox}
        style={isMobile ? {} : { marginTop: "50px" }}
      >
        {/* Info Box */}
        <p
          className={styles.titleFont}
          style={{ fontSize: isMobile ? "21px" : "28px" }}
        >
          {language === "ko" ? "🔍 어떤 나라인가요?" : "🔍 About this country"}
        </p>
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
      </div>
      <div
        className={styles.sidebarOuterBox}
        style={isMobile ? {} : { marginTop: "30px" }}
      >
        {isDpChart ? (
          <>
            <p
              className={styles.titleFont}
              style={{ fontSize: isMobile ? "21px" : "28px" }}
            >
              {language === "ko"
                ? "📈 차트로 한눈에 보기"
                : "📈 Let's see briefly"}
            </p>
            <WorldSidebarChartBox
              isDpChart={isDpChart}
              country={country.FIPS_10_.toLowerCase()}
            />
          </>
        ) : (
          <div style={{ height: "100px" }}></div>
        )}
      </div>

      <button className={styles.travelBtn} onClick={() => clickTravelBtn()}>
        <span>{language === "en" ? "TRAVEL" : "여행떠나기"}</span>
      </button>
    </>
  );
}

export default WorldSidebar;
