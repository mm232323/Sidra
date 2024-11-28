"use client";
import React from "react";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { getPurchases } from "../../../actions/main";
import { AnimatePresence } from "framer-motion";
import Model from "@/components/UI/model/Model";
import OrderDetails from "@/components/orders/orderDetails/OrderDetails";
import OrderRow from "@/components/orders/orderRow/OrderRow";
import OrdersHeader from "@/components/orders/ordersHeader/OrdersHeader";
export default function PurchasesPage() {
  const [selectedPurchase, setSelectedPurchase] = useState({
    id: 0,
    name: "",
    phone: "",
    date: "",
    products: [],
    adds: "",
  });
  const [statue, setStatue] = useState("successed");
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    async function fetchPurchases() {
      setPurchases(await getPurchases());
    }
    fetchPurchases();
  }, []);
  function handleStatue(statue) {
    setStatue((prevStatue) => statue);
  }
  const handleselectedPurchase = (Purchase) => {
    console.log(selectedPurchase);
    setSelectedPurchase((prevOrder) => Purchase);
  };
  let choosedOpt = [];
  if (purchases.length > 0)
    choosedOpt =
      statue == "successed" ? purchases[0].orders : purchases[1].orders;
  console.log(choosedOpt);
  return (
    <>
      <div className={styles.chooses}>
        <button
          className={styles.but}
          style={
            statue == "successed"
              ? { backgroundColor: "#031C0B", color: "white" }
              : {}
          }
          onClick={() => handleStatue("successed")}
        >
          مبيعات ناجحة
        </button>
        <button
          className={styles.but}
          style={
            statue == "failed"
              ? {
                  backgroundColor: "#1c0312",
                  color: "white",
                }
              : { backgroundColor: "#d0318134" }
          }
          onClick={() => handleStatue("failed")}
        >
          طلبات مرفوضة
        </button>
      </div>
      <OrdersHeader />
      <div className={styles.purchases_container}>
        <AnimatePresence>
          {choosedOpt.length == 0 ? (
            <center>
              <p style={{ opacity: 0.5 }}>لا توجد طلابات</p>
            </center>
          ) : (
            choosedOpt
              .reverse()
              .map((order, idx) => (
                <OrderRow
                  key={idx}
                  order={order}
                  color={statue == "successed" ? "#089900" : "#990061"}
                  bg={statue == "successed" ? "#d9f3cc" : "#ffcdd1"}
                  index={choosedOpt.length - idx}
                  onSelectOrder={handleselectedPurchase}
                />
              ))
          )}
        </AnimatePresence>
        <Model
          isOpened={selectedPurchase.name.length > 0}
          onhandleClose={() =>
            setSelectedPurchase({
              id: 0,
              name: "",
              phone: "",
              date: "",
              products: [],
              adds: "",
            })
          }
        >
          <OrderDetails
            order={selectedPurchase}
            type="purchase"
            color={statue == "successed" ? "#089900" : "#990061"}
            onHandleClose={() =>
              setSelectedPurchase({
                id: 0,
                name: "",
                phone: "",
                date: "",
                products: [],
                adds: "",
              })
            }
          />
        </Model>
      </div>
    </>
  );
}
