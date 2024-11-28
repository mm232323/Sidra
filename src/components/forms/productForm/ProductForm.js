import React from "react";
import styles from "./ProductForm.module.css";
import { setProduct } from "../../../../actions/main";
export default function ProductForm({ handleClose }) {
  const [state, action] = React.useActionState(setProduct, []);
  if (state.includes("done")) {
    handleClose();
    return;
  }
  return (
    <form className={styles.product_form} action={action}>
      <input
        placeholder="اسم المنتج"
        type="text"
        name="name"
        className={styles.product_inp}
        style={
          state.includes("name")
            ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
            : {}
        }
      />
      <input
        placeholder="الكتلة"
        type="number"
        name="weight"
        className={styles.product_inp}
        style={
          state.includes("weight")
            ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
            : {}
        }
      />
      <input
        placeholder="سعر المنتج"
        type="text"
        name="product_price"
        className={styles.product_inp}
        style={
          state.includes("product_price")
            ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
            : {}
        }
      />
      <input
        placeholder="سعر العميل"
        type="text"
        name="price"
        className={styles.product_inp}
        style={
          state.includes("client_price")
            ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
            : {}
        }
      />
      <button className={styles.product_but}>انشئ المنتج</button>
    </form>
  );
}
