"use client";

import React from "react";

import styles from "./Points.module.css";

import { useState } from "react";

export default function Points({ onHandleIdx }) {
  const [pointIdx, setPointIdx] = useState(0);
  const handleIdx = (idx) => {
    setPointIdx(idx);
    onHandleIdx(idx);
  };
  return (
    <div className={styles.points}>
      <div
        className={styles.point}
        style={pointIdx == 0 ? { backgroundColor: "#EC7D2E" } : {}}
        onClick={() => handleIdx(0)}
      ></div>
      <div
        className={styles.point}
        style={pointIdx == 1 ? { backgroundColor: "#EC7D2E" } : {}}
        onClick={() => handleIdx(1)}
      ></div>
      <div
        className={styles.point}
        style={pointIdx == 2 ? { backgroundColor: "#EC7D2E" } : {}}
        onClick={() => handleIdx(2)}
      ></div>
    </div>
  );
}
