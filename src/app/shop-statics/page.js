// "use server";
import React from "react";
import styles from "./page.module.css";
export default async function StaticsPage() {
  // const response = await fetch(`${process.env.SERVER_HOST_PORT}/get-statics`);
  // const statics = await response.json();
  return (
    <div className={styles.statics_container}>
      {/* {statics.map((staticProp) => (
        <div key={staticProp.name} className={styles.property}>
          <h1>{staticProp.name}</h1>
          <h1>{staticProp.value}</h1>
        </div>
      ))} */}
    </div>
  );
}
