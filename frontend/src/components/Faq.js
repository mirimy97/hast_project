import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Faq.module.css";
const Faq = ({ faq, index, toggleFAQ }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.faq} ${faq.open ? styles.open : ""}`}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className={styles.faqQuestion}>
        <span className={styles.red}>Q</span> {t(`QnAContent.${faq.question}`)}
      </div>
      <div className={`${styles.faqAnswer}`}>
        <span className={styles.blue}>A</span> {t(`QnAContent.${faq.answer}`)}
      </div>
    </div>
  );
};

export default Faq;
