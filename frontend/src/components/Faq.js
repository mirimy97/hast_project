import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from "./Faq.module.css";
const Faq = ({ faq, index, toggleFAQ }) => {
  const { t } = useTranslation();
  const isMobile = useSelector((state) => state.status.isMobile);
  return (
    <div
      className={`${styles.faq} ${faq.open ? styles.open : ""}`}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className={isMobile ? styles.faqQuestionM : styles.faqQuestion}>
        <span className={styles.red}>Q</span> {t(`QnAContent.${faq.question}`)}
      </div>
      <div className={`${styles.faqAnswer}`}>
        <span className={styles.blue}>A</span> {t(`QnAContent.${faq.answer}`)}
      </div>
    </div>
  );
};

export default Faq;
