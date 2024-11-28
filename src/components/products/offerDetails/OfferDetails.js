import React from "react";
import styles from "./OfferDetails.module.css";
export default function OfferDetails({ offer }) {
  return (
    <div className={styles.offer_details_container}>
      <div className={styles.offer_detail}>
        <h1>اسم العرض</h1>
        <h1>{offer.name}</h1>
      </div>
      <div className={styles.offer_detail}>
        <h1>سعر العميل</h1>
        <h1>{offer.price}</h1>
      </div>
      <h1 style={{ direction: "rtl" }}>المنتجات</h1>
      <div>
        {offer.products.map((product) => (
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
