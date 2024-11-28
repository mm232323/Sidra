import React from "react";
import styles from "./ChargeRow.module.css";
import { motion } from "framer-motion";
export default function ChargeRow({ charge, index, onSelectCharge }) {
  return (
    <motion.div
      className={styles.charge_row}
      variants={{
        show: { opacity: 1, filter: "blur(0)", y: 0, x: "-50%" },
        hide: { opacity: 0, filter: "blur(8px)", y: 20, x: "-50%" },
      }}
      initial="hide"
      animate="show"
      exit="hide"
      onClick={() => onSelectCharge(charge)}
    >
      <div className={styles.charge_prop}>{index}</div>
      <div className={styles.charge_prop} style={{ fontSize: 22 }}>
        {charge.products.length}
      </div>
      <div className={styles.charge_prop}>{charge.totalPrice} ج.م</div>
      <div className={styles.charge_prop}>{charge.order_price} ج.م</div>
    </motion.div>
  );
}
