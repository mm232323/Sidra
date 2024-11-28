"use client";
import Image from "next/image";
import styles from "./page.module.css";
import details from "./details.json";
import { Fragment, useState } from "react";
import Points from "@/components/home/points/Points";
import { AnimatePresence, motion } from "framer-motion";
export default function Home() {
  const [cursoredIdx, setCursoredIdx] = useState(0);
  const handleIdx = (idx) => {
    setCursoredIdx(idx);
  };
  return (
    <div className={styles.details_container}>
      {details.map((detail) =>
        detail.id == cursoredIdx ? (
          <AnimatePresence key={detail.id}>
            <Fragment key={detail.id}>
              <motion.div
                variants={{
                  show: { opacity: 1, filter: "blur(0)", y: 0 },
                  hide: { opacity: 0, filter: "blur(10px)", y: -20 },
                }}
                initial="hide"
                animate="show"
                exit="hide"
              >
                <h1 className={styles.title}>{detail.title}</h1>
                <p className={styles.text}>{detail.text}</p>
                <Points onHandleIdx={handleIdx} />
              </motion.div>
              <motion.div
                className={styles.img_container}
                variants={{
                  show: { opacity: 1, filter: "blur(0)", y: 0 },
                  hide: { opacity: 0, filter: "blur(10px)", y: -20 },
                }}
                initial="hide"
                animate="show"
                exit="hide"
              >
                <Image
                  src={detail.img}
                  width={800}
                  height={800}
                  alt="details img"
                />
              </motion.div>
            </Fragment>
          </AnimatePresence>
        ) : (
          <Fragment key={detail.id}></Fragment>
        )
      )}
    </div>
  );
}
