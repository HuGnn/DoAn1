import React from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

export default function CommonLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
