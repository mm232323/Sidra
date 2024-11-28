import React from "react";
import styles from "./ProductRow.module.css";
import { motion } from "framer-motion";
export default function ProductRow({ product, index, onHandleSelectProd }) {
  return (
    <motion.div
      className={styles.product_row}
      variants={{
        show: { opacity: 1, filter: "blur(0)", y: 0, x: "-50%" },
        hide: { opacity: 0, filter: "blur(8px)", y: 20, x: "-50%" },
      }}
      initial="hide"
      animate="show"
      exit="hide"
      onClick={() => onHandleSelectProd(product)}
    >
      <div className={styles.product_prop}>{index}</div>
      <div className={styles.product_prop} style={{ fontSize: 22 }}>
        {product.name}
      </div>
      <div className={styles.product_prop}>{product.weight} جرام</div>
      <div className={styles.product_prop}>{product.product_price} ج.م</div>
      <div className={styles.product_prop}>{product.price} ج.م</div>
      <div className={styles.product_prop}>{product.stock}</div>
      <div className={styles.product_prop}>{product.remained}</div>
    </motion.div>
  );
}
