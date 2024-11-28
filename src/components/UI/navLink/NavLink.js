"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function NavLink({ name, children }) {
  const path = usePathname();
  return (
    <h1 style={path.includes(name) ? { opacity: 0.5 } : {}}>{children}</h1>
  );
}
