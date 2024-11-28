import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import NavLink from "@/components/UI/navLink/NavLink";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <Image src="/logo.svg" width={90} height={83} alt="logo" />
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/orders">
          <NavLink name={"orders"}>الطلبات</NavLink>
        </Link>
        <Link href="/purchase">
          <NavLink name={"purchase"}>المبيعات</NavLink>
        </Link>
        <Link href="/products">
          <NavLink name={"products"}>المنتجات</NavLink>
        </Link>
        <Link href="/charges">
          <NavLink name={"charges"}>الشحنات</NavLink>
        </Link>
        <Link href="/shop-statics">
          <NavLink name={"shop-statics"}>الإحصائيات</NavLink>
        </Link>
      </div>
      <div className={styles.socials}>
        <Link href="http://www.facebook.com">
          <FaFacebook color="#2C180D" size={30} />
        </Link>
        <Link href="mailto:mohammed.qurany1@gmail.com">
          <IoLogoWhatsapp color="#2c180d" size={30} />
        </Link>
        <Link href="http://www.instagram.com">
          <FaSquareInstagram color="#2c180d" size={30} />
        </Link>
      </div>
    </header>
  );
}
