"use client";
import React, { useState } from "react";
import styles from "./Model.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
export default function Model({ isOpened, children, onhandleClose, y }) {
  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          className={styles.back_shadow}
          variants={{ show: { opacity: 1 }, hide: { opacity: 0 } }}
          initial="hide"
          animate="show"
          exit="hide"
          style={{ top: y }}
        >
          <motion.div
            className={styles.model}
            variants={{
              show: { opacity: 1, filter: "blur(0)" },
              hide: { opacity: 0, filter: "blur(6px)" },
            }}
            initial="hide"
            animate="show"
            exit="hide"
          >
            <IoMdClose
              size={26}
              color="#170B01"
              className={styles.ico}
              onClick={onhandleClose}
            />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
