import React from "react";
import styles from "./InfoWindow.module.css"

export default function InfoWindow({place}) {
  return (
    <div>
      <div className={styles.wrapBox}>
        <div className={styles.title}>
          {place.name}
        </div>
        <hr/>
        <div className={styles.location}>
          {place.address}
        </div>
        <div className={styles.location}>
          ⭐: {place.rating ? place.rating : "별점 없음"}
        </div>
      </div>
      <div className={styles.tri}>
      </div>
    </div>
  )
}