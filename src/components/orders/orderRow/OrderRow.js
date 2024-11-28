import React from "react";
import styles from "./OrderRow.module.css";
import { motion } from "framer-motion";
export default function OrderRow({ order, index, onSelectOrder, color, bg }) {
  return (
    <motion.div
      className={styles.order_row}
      variants={{
        show: { opacity: 1, filter: "blur(0)", y: 0, x: "-50%" },
        hide: { opacity: 0, filter: "blur(8px)", y: 20, x: "-50%" },
      }}
      style={{ backgroundColor: bg }}
      initial="hide"
      animate="show"
      exit="hide"
      onClick={() => onSelectOrder({ id: index, ...order })}
    >
      <div className={styles.order_prop} style={{ backgroundColor: color }}>
        {index}
      </div>
      <div className={styles.order_prop} style={{ backgroundColor: color }}>
        {order.name}
      </div>
      <div className={styles.order_prop} style={{ backgroundColor: color }}>
        {order.phone}
      </div>
      <div className={styles.order_prop} style={{ backgroundColor: color }}>
        {order.date}
      </div>
      <div className={styles.order_prop} style={{ backgroundColor: color }}>
        {order.adds}
      </div>
    </motion.div>
  );
}
