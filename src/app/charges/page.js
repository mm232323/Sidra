"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import ChargesHeader from "@/components/charges/chargersHeader/chargesHeader";
import { TbShoppingCartBolt } from "react-icons/tb";
import Model from "@/components/UI/model/Model";
import ChargeForm from "@/components/forms/chargeForm/ChargeForm";
import { getCharges } from "../../../actions/main";
import ChargeRow from "@/components/charges/chargeRow/ChargeRow";
import ChargeDetails from "@/components/charges/chargeDetails/ChargeDetails";
export default function ChargesPage() {
  const [toggleMod, setToggleMod] = useState(false);
  const [charges, setCharges] = useState([]);
  const [selectedCharge, setSelectedCharge] = useState({
    order_price: "",
    products: [],
  });
  useEffect(() => {
    async function fetchCharges() {
      setCharges(await getCharges());
    }
    fetchCharges();
  }, []);
  const handleSetMod = (mood) => {
    setToggleMod((prevMood) => mood);
  };
  const handleCloseCharge = () => {
    setSelectedCharge({ order_price: "", products: [] });
  };
  return (
    <>
      <center>
        <button className={styles.action} onClick={() => handleSetMod(true)}>
          اضف شحنة <TbShoppingCartBolt color="rgb(4, 4, 36)" size={20} />
        </button>
      </center>
      <ChargesHeader />
      <Model isOpened={toggleMod} onhandleClose={() => handleSetMod(false)}>
        <ChargeForm handleClose={handleSetMod} />
      </Model>
      {charges.reverse().map((charge, idx) => (
        <ChargeRow
          key={idx}
          charge={charge}
          index={charges.length - idx}
          onSelectCharge={() => setSelectedCharge(charge)}
        />
      ))}
      <Model
        isOpened={selectedCharge.order_price !== ""}
        onhandleClose={handleCloseCharge}
      >
        <ChargeDetails charge={selectedCharge} />
      </Model>
    </>
  );
}
