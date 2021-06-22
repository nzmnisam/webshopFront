import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import VerticalNav from "../Components/VerticalNav/VerticalNav";

const AdminLayout = (props) => {
  return (
    <div className="adminLayout">
      <Navbar {...props}></Navbar>
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li key={1}>
                <Link to="/admin">Početak</Link>
              </li>
              <li key={2}>
                <Link to="/admin/proizvodi">Proizvodi</Link>
              </li>
              <li key={3}>
                <Link>Podaci o kupcima</Link>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
