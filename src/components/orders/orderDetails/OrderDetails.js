import React from "react";
import styles from "./OrderDetails.module.css";
import { handleOrderActions } from "../../../../actions/main";
import { useState } from "react";
export default function OrderDetails({ order, onHandleClose, type, color }) {
  const mainColor = { backgroundColor: color };
  const [toggleClose, setToggleClose] = useState();
  const handleActions = (order, state) => {
    handleOrderActions(order, state);
    setToggleClose(true);
  };
  if (toggleClose == true) {
    onHandleClose();
    return;
  }
  return (
    <div className={styles.order_details_container}>
      <div className={styles.order_detail} style={mainColor}>
        <h1>اسم العميل</h1>
        <h1>{order.name}</h1>
      </div>
      <div className={styles.order_detail} style={mainColor}>
        <h1>رقم العميل</h1>
        <h1>{order.phone}</h1>
      </div>
      <div className={styles.order_detail} style={mainColor}>
        <h1>تاريخ الطلب</h1>
        <h1>{order.date}</h1>
      </div>
      <h1 style={{ direction: "rtl" }}>المنتجات</h1>
      <div>
        {order.products.map((product) => (
          <div
            key={`${product.name}_${product.weight}_${product.quantity}`}
            className={styles.product_container}
          >
            <div className={styles.product_detail} style={mainColor}>
              {product.name}
            </div>
            <div className={styles.product_detail} style={mainColor}>
              {product.weight} جرام
            </div>
            <div className={styles.product_detail} style={mainColor}>
              {product.quantity}
            </div>
            <div className={styles.product_detail} style={mainColor}>
              {product.type}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.order_detail} style={mainColor}>
        <h1>إضافات</h1>
        <h1>{order.adds.length == 0 ? "لا توجد إضافات" : order.adds}</h1>
      </div>
      {type == "order" && (
        <div className={styles.actions}>
          <button
            className={styles.accepted}
            onClick={() => handleActions(order, "successed")}
          >
            تم التسليم
          </button>
          <button onClick={() => handleActions(order, "failed")}>
            {" "}
            رفض الطلب
          </button>
        </div>
      )}
    </div>
  );
}
