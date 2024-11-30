"use client";
import React from "react";
import styles from "./OrdersForm.module.css";
import { useState, useRef, useEffect } from "react";
import { getProducts, setOrder } from "../../../../actions/main";
import { FaPlus } from "react-icons/fa6";
export default function OrdersForm({ onHandleClose }) {
  const butRef = useRef(null);
  const inpRef = useRef(null);
  const [state, action] = React.useActionState(setOrder, []);
  const [products, setProducts] = useState([
    { name: "الاسم", weight: 0, quantity: 0, type: "" },
  ]);
  const [mainProds, setMainProds] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      setMainProds(await getProducts());
    }
    fetchProducts();
  }, []);
  const handleChange = (idx, property, event) => {
    const inputVal = event.target.value;
    setProducts((prevProducts) => {
      let newProds = [];
      for (let i = 0; i < prevProducts.length; i++) {
        const selectedProd = prevProducts[i];
        if (i == idx) {
          if (property == "name") {
            selectedProd.name = inputVal;
          } else if (property == "weight") selectedProd.weight = inputVal;
          else if (property == "type") selectedProd.type = inputVal;
          else selectedProd.quantity = inputVal;
        }
        newProds.push(selectedProd);
      }
      return newProds;
    });
  };
  const addProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { name: "", weight: 0, quantity: 0 },
    ]);
  };
  if (state.includes("done")) {
    onHandleClose();
    return;
  }
  return (
    <form className={styles.order_form} action={action}>
      <input
        type="text"
        placeholder="اسم العميل"
        className={styles.normal_inp}
        name="name"
        ref={inpRef}
        style={
          state.includes("name")
            ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
            : {}
        }
      />
      <input
        type="number"
        placeholder="رقم العميل"
        className={styles.normal_inp}
        name="phone"
        style={
          state.includes("phone")
            ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
            : {}
        }
      />
      <input
        type="date"
        placeholder="تاريخ الطلب"
        className={styles.normal_inp}
        name="date"
        style={
          state.includes("date")
            ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
            : {}
        }
      />
      <h1 style={{ direction: "rtl" }}>المنتجات</h1>
      {products.map((product, idx) => (
        <div style={{ display: "flex", alignItems: "center" }} key={idx}>
          {idx == products.length - 1 && (
            <FaPlus
              color="#FA9E4E"
              size={12}
              className={styles.add_ico}
              onClick={addProduct}
            />
          )}
          <div key={idx} className={styles.product_container}>
            <select
              className={styles.product_inp}
              onChange={(event) => handleChange(idx, "name", event)}
              style={
                state.includes(`product_${idx}`)
                  ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
                  : {}
              }
            >
              <option>الاسم</option>
              {mainProds.map((prod, idx) => (
                <option key={idx}>{prod.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="الوزن"
              defaultValue={product.weight}
              className={styles.product_inp}
              onChange={(event) => handleChange(idx, "weight", event)}
              style={
                state.includes(`product_${idx}`)
                  ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
                  : {}
              }
            />
            <input
              type="number"
              placeholder="الكمية"
              defaultValue={product.quantity}
              className={styles.product_inp}
              onChange={(event) => handleChange(idx, "quantity", event)}
              style={
                state.includes(`product_${idx}`)
                  ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
                  : {}
              }
            />
            <select
              className={styles.product_inp}
              defaultValue={product.type}
              onChange={(event) => handleChange(idx, "type", event)}
              style={
                state.includes(`product_${idx}`)
                  ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
                  : {}
              }
            >
              <option>النوع</option>
              <option>عادي</option>
              <option>هدية</option>
              <option>سدرة</option>
            </select>
          </div>
        </div>
      ))}
      <input
        type="text"
        name="products"
        value={products
          .map(
            (product) =>
              `${product.name}_${product.weight}_${product.quantity}_${product.type}`
          )
          .join("|")}
        style={{ display: "none" }}
      />
      <input
        type="text"
        placeholder="(',' الإضافات (الفاصل ب"
        className={styles.normal_inp}
        name="adds"
      />
      <button className={styles.action_but} ref={butRef}>
        تسجيل الطلب
      </button>
    </form>
  );
}
