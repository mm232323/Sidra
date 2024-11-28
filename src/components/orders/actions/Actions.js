"use client";
import React from "react";
import { useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa6";
import styles from "./Actions.module.css";
import { AnimatePresence, motion } from "framer-motion";
export default function Actions({ handleAdd, onhandleFilters }) {
  const [handleFilters, setHandleFilters] = useState({
    id: "",
    name: "",
    phone: "",
    date: "",
  });
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleOrder, setToggleOrder] = useState(false);
  const handleFilter = () => {
    setToggleFilter((prevTog) => !prevTog);
  };
  const handleOrder = () => {
    setToggleOrder((prevTog) => !prevTog);
    handleAdd(!toggleOrder);
  };
  const handleChange = (event, key) => {
    const value = event.target.value;
    setHandleFilters((prevFilters) => {
      let newFilters = { ...prevFilters };
      if (key == "id") {
        newFilters = { ...prevFilters, id: value };
      } else if (key == "name") {
        newFilters = { ...prevFilters, name: value };
      } else if (key == "phone") {
        newFilters = { ...prevFilters, phone: value };
      } else {
        newFilters = { ...prevFilters, date: value };
      }
      onhandleFilters(newFilters);
      return newFilters;
    });
  };
  console.log(handleFilters);
  return (
    <>
      <div className={styles.actions}>
        <div
          className={styles.add}
          style={{
            color: toggleOrder ? "#fff" : "#170B01",
            backgroundColor: toggleOrder ? "#170B01" : "rgba(0,0,0,0.06)",
          }}
          onClick={handleOrder}
        >
          اضف طلب{" "}
          <FaPlus
            style={{ color: toggleOrder ? "#fff" : "#170B01" }}
            size={14.5}
          />
        </div>
        <div
          className={styles.filter}
          onClick={handleFilter}
          style={{
            color: toggleFilter ? "#fff" : "#170B01",
            backgroundColor: toggleFilter ? "#170B01" : "rgba(0,0,0,0.06)",
          }}
        >
          تصفية{" "}
          <FaFilter
            style={{ color: toggleFilter ? "#fff" : "#170B01" }}
            className={styles.ico}
            size={14.5}
          />
        </div>
      </div>
      <AnimatePresence>
        {toggleFilter && (
          <motion.div
            className={styles.options}
            variants={{
              show: { opacity: 1, filter: "blur(0)" },
              hide: { opacity: 0, filter: "blur(5px)" },
            }}
            initial="hide"
            animate="show"
            exit="hide"
          >
            <input
              placeholder="رقم الطلب"
              type="number"
              className={styles.option}
              onChange={(event) => handleChange(event, "id")}
            />
            <input
              placeholder="اسم العميل"
              type="text"
              className={styles.option}
              onChange={(event) => handleChange(event, "name")}
            />
            <input
              placeholder="رقم العميل"
              type="number"
              className={styles.option}
              onChange={(event) => handleChange(event, "phone")}
            />
            <input
              placeholder="تاريخ الطلب"
              type="date"
              className={styles.option}
              onChange={(event) => handleChange(event, "date")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
