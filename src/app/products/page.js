"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidOffer } from "react-icons/bi";
import Model from "@/components/UI/model/Model";
import ProductForm from "@/components/forms/productForm/ProductForm";
import OfferForm from "@/components/forms/offerForm/OfferForm";
import ProductsHeader from "@/components/products/productsHeader/ProductsHeader";
import { getProducts } from "../../../actions/main";
import ProductRow from "@/components/products/productRow/ProductRow";
import ProductDetails from "@/components/products/productDetails/ProductDetails";
import OfferDetails from "@/components/products/offerDetails/OfferDetails";
export default function ProductsPage() {
  const [statue, setStatue] = useState("none");
  const [y, setY] = useState(0);
  const [prods, setProds] = useState([]);
  const [selectedProd, setSelectedProd] = useState(null);
  useEffect(() => {
    async function fetchProds() {
      setProds(await getProducts());
    }
    fetchProds();
  }, []);
  const handleClose = () => setStatue("none");
  const handleCloseProd = () => setSelectedProd(null);
  const handleSelectProd = (prod) => {
    setY(window.scrollY);
    setSelectedProd(prod);
  };
  return (
    <>
      <div className={styles.actions}>
        <button
          onClick={() => setStatue("set-product")}
          style={
            statue == "set-product"
              ? { backgroundColor: "#350707", color: "white" }
              : {}
          }
        >
          {" "}
          أضف منتجاً
          <AiFillProduct
            size={23.5}
            color="#350707"
            style={statue == "set-product" ? { color: "white" } : {}}
          />
        </button>
        <button
          onClick={() => setStatue("set-offer")}
          style={
            statue == "set-offer"
              ? { backgroundColor: "#350707", color: "white" }
              : {}
          }
        >
          اضف عرضاً{" "}
          <BiSolidOffer
            size={23.5}
            color="#350707"
            style={statue == "set-offer" ? { color: "white" } : {}}
          />
        </button>
      </div>
      <Model isOpened={statue == "set-product"} onhandleClose={handleClose}>
        <ProductForm handleClose={handleClose} />
      </Model>
      <Model isOpened={statue == "set-offer"} onhandleClose={handleClose}>
        <OfferForm handleClose={handleClose} />
      </Model>
      <ProductsHeader />
      <div className={styles.products_container}>
        {prods.map((prod, idx) => (
          <ProductRow
            key={Math.random() * 1000}
            product={prod}
            index={idx + 1}
            onHandleSelectProd={handleSelectProd}
          />
        ))}
      </div>
      <Model
        isOpened={selectedProd !== null}
        onhandleClose={handleCloseProd}
        y={y}
      >
        {selectedProd && selectedProd.type == "product" ? (
          <ProductDetails product={selectedProd} />
        ) : selectedProd && selectedProd.type == "offer" ? (
          <OfferDetails offer={selectedProd} />
        ) : null}
      </Model>
    </>
  );
}
