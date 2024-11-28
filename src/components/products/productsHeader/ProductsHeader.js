import React from "react";
import styles from "./ProductHeader.module.css";
export default function ProductsHeader() {
  return (
    <div className={styles.props_header}>
      <h3>رقم المنتج</h3>
      <h3>اسم المنتج</h3>
      <h3>الكتلة</h3>
      <h3>سعر المنتج</h3>
      <h3>سعر العميل</h3>
      <h3>المخزون</h3>
      <h3>المتبقي</h3>
    </div>
  );
}
