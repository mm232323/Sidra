import React from "react";
import styles from "./OrdersHeaders.module.css";
export default function OrdersHeader() {
  return (
    <div className={styles.props_head}>
      <h3>رقم الطلب</h3>
      <h3>اسم العميل</h3>
      <h3>رقم العميل</h3>
      <h3>تاريخ الطلب</h3>
      <h3> الإضافات</h3>
    </div>
  );
}
