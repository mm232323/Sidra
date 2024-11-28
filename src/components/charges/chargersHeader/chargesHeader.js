import React from "react";
import styles from "./chargesHeader.module.css";
export default function ChargesHeader() {
  return (
    <div className={styles.props_header}>
      <h3>رقم الشحنة</h3>
      <h3>عدد المشتريات</h3>
      <h3>سعر التوصيل</h3>
      <h3>السعر الإجمالي</h3>
    </div>
  );
}
