import React from "react";
import styles from "./ProductDetails.module.css";
export default function ProductDetails({ product }) {
  return (
    <div className={styles.product_details_container}>
      <div className={styles.product_detail}>
        <h1>اسم المنتج</h1>
        <h1>{product.name}</h1>
      </div>
      <div className={styles.product_detail}>
        <h1>الكتلة</h1>
        <h1>{product.weight} جرام</h1>
      </div>
      <div className={styles.product_detail}>
        <h1>سعر المنتج</h1>
        <h1>{product.product_price} ج.م</h1>
      </div>
      <div className={styles.product_detail}>
        <h1>سعر العميل</h1>
        <h1>{product.price} ج.م</h1>
      </div>
      <div className={styles.product_detail}>
        <h1>المخزون</h1>
        <h1>{product.stock}</h1>
      </div>
      <div className={styles.product_detail}>
        <h1>المتبقي</h1>
        <h1>{product.remained}</h1>
      </div>
    </div>
  );
}
