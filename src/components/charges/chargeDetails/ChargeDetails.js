import React from "react";
import styles from "./ChargeDetails.module.css";
export default function ChargeDetails({ charge }) {
  return (
    <div className={styles.charge_details_container}>
      <div className={styles.charge_detail}>
        <h1>سعر الطلب</h1>
        <h1>{charge.order_price} ج.م</h1>
      </div>
      <div className={styles.charge_detail}>
        <h1>سعر إجمالي</h1>
        <h1>{charge.totalPrice} ج.م</h1>
      </div>
      <h1 style={{ direction: "rtl" }}>المنتجات</h1>
      <div>
        {charge.products.map((product) => (
          <div
            key={`${product.name}_${product.weight}_${product.quantity}`}
            className={styles.product_container}
          >
            <div className={styles.product_detail}>{product.name}</div>
            <div className={styles.product_detail}>{product.weight} جرام</div>
            <div className={styles.product_detail}>{product.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
