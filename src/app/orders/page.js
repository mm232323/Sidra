"use client";
import React from "react";
import styles from "./page.module.css";
import Actions from "@/components/orders/actions/Actions";
import { useState, useEffect } from "react";
import Model from "@/components/UI/model/Model";
import OrdersForm from "@/components/forms/ordersForm/OrdersForm";
import { getOrders } from "../../../actions/main";
import OrderRow from "@/components/orders/orderRow/OrderRow";
import { AnimatePresence } from "framer-motion";
import OrderDetails from "@/components/orders/orderDetails/OrderDetails";
import OrdersHeader from "@/components/orders/ordersHeader/OrdersHeader";
export default function Orders() {
  const [toggleOrder, setToggleOrder] = useState(false);
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    phone: "",
    date: "",
  });
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({
    id: 0,
    name: "",
    phone: "",
    date: "",
    products: [],
    adds: "",
  });
  useEffect(() => {
    async function fetchOrders() {
      setOrders((await getOrders()).reverse());
    }
    fetchOrders();
  }, []);
  const handleAddOrder = (state) => {
    setToggleOrder(state);
  };
  const handleClose = () => {
    setToggleOrder(false);
  };
  const handleFilters = (filters) => {
    setFilters(filters);
  };
  const handleSelectedOrder = (order) => {
    console.log(selectedOrder);
    setSelectedOrder((prevOrder) => order);
  };
  const selectedOrders = orders.filter((order) => {
    if (filters.id !== "" && order.id !== +filters.id) return false;
    return (
      order.name.includes(filters.name) &&
      order.phone.includes(filters.phone) &&
      order.date.includes(filters.date)
    );
  });
  return (
    <>
      <Actions handleAdd={handleAddOrder} onhandleFilters={handleFilters} />
      <Model isOpened={toggleOrder} onhandleClose={handleClose}>
        <OrdersForm onHandleClose={handleClose} />
      </Model>
      <OrdersHeader />
      <div className={styles.orders_container}>
        <AnimatePresence>
          {selectedOrders.length == 0 ? (
            <center>
              <p style={{ opacity: 0.5 }}>لا توجد طلابات</p>
            </center>
          ) : (
            selectedOrders
              .reverse()
              .map((order, idx) => (
                <OrderRow
                  key={idx}
                  order={order}
                  index={selectedOrders.length - idx}
                  onSelectOrder={handleSelectedOrder}
                  color="#FFA245"
                  bg="#ffe1bc"
                />
              ))
          )}
        </AnimatePresence>
        <Model
          isOpened={selectedOrder.name.length > 0}
          onhandleClose={() =>
            setSelectedOrder({
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
            order={selectedOrder}
            type="order"
            onHandleClose={() =>
              setSelectedOrder({
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
