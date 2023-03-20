import styles from "./WorldSidebar.module.css";
import WorldSidebarInfoBox from "./WorldSidebarInfoBox";

function WorldSidebar({ country }) {
  const flagEndpoint = "https://corona.lmao.ninja/assets/img/flags";
  const imageurl = `${flagEndpoint}/${country?.ISO_A2.toLowerCase()}.png`;

  return (
    <>
      <p
        style={{
          backgroundImage: `url(${imageurl})`,
          fontSize: country?.NAME.length >= 9 ? "4rem" : "5rem",
        }}
        className={styles.namefont}
      >
        {country?.NAME ? country?.NAME : ""}
      </p>
      {/* Info Box */}
      {country && (
        <WorldSidebarInfoBox
          GDP={country?.GDP_MD_EST}
          ECONOMY={country?.ECONOMY}
          INCOME_GRP={country?.INCOME_GRP}
          POP_EST={country?.POP_EST}
          POP_RANK={country?.POP_RANK}
          CONTINENT={country?.CONTINENT}
          SUBREGION={country?.SUBREGION}
        />
      )}
    </>
  );
}

export default WorldSidebar;
