import React from "react";
import InfoWindow from "./InfoWindow";

export function PlacesMarker({id, place, target}) {
  const imgSrc = (id === 1 ? "/assets/hospital.png" : id === 2 ? "/assets/police.png" : "/assets/embassy.png")

  return(
    <div>
      {target && <InfoWindow place={place} />}
      <div style={{zIndex: (target ? 999 : 1), position: "relative", cursor: "pointer"}}>
        <img src={imgSrc} alt={id === 1 ? "hospital" : id === 2 ? "police" : "embassy"} width="20px" style={{zIndex: 1}}/>
      </div>
    </div>
  )
}