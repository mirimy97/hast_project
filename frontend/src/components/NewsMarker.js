import React, { useEffect, useState } from "react";

export function NewsMarker() {

  return (
    <div
      style={{zIndex: 999, cursor: "pointer"}}
    >
      <img src="/assets/redMarker.png" alt="marker" width="23px"/>
    </div>
  )
}
