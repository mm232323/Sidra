"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getStatics } from "../../../actions/main";
export default async function StaticsPage() {
  const [staticVals, setStaticVals] = useState([]);
  useEffect(() => {
    async function fetchStatics() {
      setStaticVals(await getStatics());
    }
    fetchStatics();
  }, []);
  return (
    <div className={styles.statics_container}>
      {staticVals.map((staticProp) => (
        <div key={staticProp.name} className={styles.property}>
          <h1>{staticProp.name}</h1>
          <h1>{staticProp.value}</h1>
        </div>
      ))}
    </div>
  );
}
