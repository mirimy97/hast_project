import * as React from "react";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import { t } from "i18next";
import { useSelector } from "react-redux";

function Toggle({icon, place, idx, toggle, setToggle, setShowPlace}) {
  const isMobile = useSelector((state) => state.isMobile.isMobile);

  const ToggleClick = (idx) => {
    if (toggle.includes(idx)) {
      const newList = toggle.filter((item) => item !== idx)
      setToggle(newList)
      console.log(newList)
      setShowPlace(false)
    } else {
      console.log([...toggle, idx])
      setToggle([...toggle, idx])
      setShowPlace(true)
    }
  }

  return (
    <Fab
      variant="extended"
      sx={{ 
        backgroundColor: (toggle.includes(idx) ? "#364AB5" : "white"), 
        "&:hover": {
          backgroundColor: (toggle.includes(idx) ? "#364AB5" : "white")
        },
        borderRadius:"10px", 
        width:(isMobile ? "90px" : "130px"), 
        height: (isMobile ? "40px" : '52px'),
        position: 'absolute', 
        top: '16px', 
        left: ( 
                isMobile ? 
                idx === 1 ? '10px' : idx === 2 ? '110px' : '210px' :
                idx === 1 ? '16px' : idx === 2 ? '156px' : '296px'
              )
      }}
      onClick={() => ToggleClick(idx)}
    >
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{fontSize: ( isMobile ? idx === 2 ? "14px" : "12px" : idx === 2 ? "18px" : "16px"), marginBottom: (idx === 2? "4px": 0)}} >
          {icon}
        </div>
        <div
          style={{
            marginLeft: "4px",
            lineHeight: (isMobile ? "12px" : "18px"),
            textAlign: "center",
            fontSize: (isMobile ? "10px" : "16px"),
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
