import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

function GameButton({ label, id, setGameName }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px 10px",
      }}
    >
      <img
        src={id === "1" ? "/assets/flags.png" : "/assets/capital.png"}
        alt={id === "1" ? "국기 맞추기" : "수도 맞추기"}
        width="60px"
        style={{ paddingRight: "5px" }}
      />
      <AwesomeButton
        size="large"
        type="secondary"
        onPress={() => {
          setGameName(id);
        }}
      >
        {label}
      </AwesomeButton>
    </div>
  );
}

export default GameButton;
