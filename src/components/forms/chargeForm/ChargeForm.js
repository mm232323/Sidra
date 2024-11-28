import React, { useEffect, useState } from "react";
import styles from "./ChargeForm.module.css";
import { getProducts, setCharge } from "../../../../actions/main";
import { FaPlus } from "react-icons/fa6";
export default function ChargeForm({ handleClose }) {
  const [addedProducts, setAddedProducts] = useState([]);
  const [state, action] = React.useActionState(setCharge, []);
  const [products, setProducts] = useState([
    { name: "", weight: 0, quantity: 0 },
  ]);
  useEffect(() => {
    async function fetchProds() {
      setAddedProducts(await getProducts());
    }
    fetchProds();
  }, []);
  const handleChange = (event, idx, prop) => {
    const inpValue = event.target.value;
    setProducts((prevProds) => {
      const newProducts = [];
      for (let i = 0; i < products.length; i++) {
        const selectedProd = products[i];
        if (i == idx) {
          if (prop == "name") {
            selectedProd.name = inpValue;
          } else if (prop == "weight") {
            selectedProd.weight = inpValue;
          } else {
            selectedProd.quantity = inpValue;
          }
        }
        newProducts.push(selectedProd);
      }
      return newProducts;
    });
  };
  const addProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { name: "", weight: 0, quantity: 0 },
    ]);
  };
  if (state?.includes("done")) {
    handleClose(false);
    return;
  }
  return (
    <form className={styles.charge_form} action={action}>
      <input
        placeholder="سعر الطلب"
        type="number"
        name="order_price"
        className={styles.charge_inp}
        style={
          state?.includes("order_price")
            ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
            : {}
        }
      />
      <h1 style={{ direction: "rtl" }}>المنتجات</h1>
      {products.map((product, idx) => (
        <div style={{ display: "flex", alignItems: "center" }} key={idx}>
          {idx == products.length - 1 && (
            <FaPlus
              color="#b8b2ff"
              size={12}
              className={styles.add_ico}
              onClick={addProduct}
            />
          )}
          <div className={styles.product_container}>
            <select
              onChange={(event) => handleChange(event, idx, "name")}
              className={styles.product_inp}
              style={
                state?.includes(`product_${idx}`)
                  ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
                  : {}
              }
            >
              <option>الاسم</option>
              {addedProducts
                .filter((prod) => prod.type == "product")
                .map((addedProd) => (
                  <option key={Math.random() * 1000}>{addedProd.name}</option>
                ))}
            </select>
            <input
              placeholder="الكتلة"
              type="number"
              onChange={(event) => handleChange(event, idx, "weight")}
              className={styles.product_inp}
              style={
                state?.includes(`product_${idx}`)
                  ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
                  : {}
              }
            />
            <input
              placeholder="الكمية"
              type="number"
              onChange={(event) => handleChange(event, idx, "quantity")}
              className={styles.product_inp}
              style={
                state?.includes(`product_${idx}`)
                  ? { backgroundColor: "rgba(0,0,0,0.1)", borderColor: "black" }
                  : {}
              }
            />
          </div>
        </div>
      ))}
      <input
        name="products"
        value={products
          .map(
            (product, idx) =>
              `${product.name}_${product.weight}_${product.quantity}`
          )
          .join("|")}
        style={{ display: "none" }}
      />
      <button className={styles.charge_but}>انشئ شحنة</button>
    </form>
  );
}
