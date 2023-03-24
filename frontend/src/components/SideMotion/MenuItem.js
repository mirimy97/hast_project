import * as React from "react";
import { motion } from "framer-motion";
import MapSidebar from "./MapSidebar";
import styles from "./SideMotion.module.css";

const variants = {
  open: {
    //y: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000,
        velocity: -100,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  },
  closed: {
    // y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, staggerChildren: 0.05, staggerDirection: -1 },
    },
  },
};

export const MenuItem = ({ i }) => {
  return (
    <motion.li variants={variants} className={styles.li}>
      <MapSidebar />
    </motion.li>
  );
};
