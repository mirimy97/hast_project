import * as React from "react";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import { t } from "i18next";

function Toggle({ icon, place, idx }) {
  const [toggle, setToggle] = useState(false);
  const ToggleClick = () => {
    setToggle((current) => !current);
  };

  return (
    <Fab
      variant="extended"
      sx={{
        backgroundColor: toggle === true ? "#364AB5" : "white",
        borderRadius: "10px",
        width: "130px",
        height: "52px",
        position: "absolute",
        top: "16px",
        left: idx === 1 ? "16px" : idx === 2 ? "156px" : "296px",
      }}
      onClick={() => ToggleClick(idx)}
    >
      {/* <NavigationIcon sx={{ mr: 1 }} /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: idx === 2 ? "18px" : "16px",
            marginBottom: idx === 2 ? "4px" : 0,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            marginLeft: "4px",
            lineHeight: "18px",
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {t("location." + place)}
        </div>
      </div>
    </Fab>
  );
}

export default Toggle;
