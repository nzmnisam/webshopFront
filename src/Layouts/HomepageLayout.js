import React from "react";
import Footer from "../Components/Footer/Footer";
import Header from "./../Components/Navbar/Navbar";

const HomepageLayout = (props) => {
  return (
    <div className="full-height">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default HomepageLayout;
