import React from "react";
import Header from "./../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = (props) => {
  return (
    <div className="full-height">
      <Header />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
