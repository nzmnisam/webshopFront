import React from "react";
import Adminbar from "../Components/Adminbar/Adminbar";
import Footer from "../Components/Footer/Footer";
import Header from "./../Components/Navbar/Navbar";

const HomepageLayout = (props) => {
  return (
    <div className="full-height">
      <Header {...props} />
      {props.children}
      <Footer />
    </div>
  );
};

export default HomepageLayout;
