import React from "react";
import Basta from "../../Assets/Categories/basta.jpg";
import DnevnaSoba from "../../Assets/Categories/dnevnaSoba.jpg";
import Dodaci from "../../Assets/Categories/dodaci.jpg";
import Kuhinja from "../../Assets/Categories/kuhinja.jpeg";
import RadnaSoba from "../../Assets/Categories/radnaSoba.jpg";
import SpavacaSoba from "../../Assets/Categories/spavacaSoba.jpg";

import "./Directory.css";

const Directory = () => {
  return (
    <div className="directory">
      <div className="container">
        <div
          className="category"
          style={{ backgroundImage: `url(${DnevnaSoba})` }}
        >
          <a className="category-link">Dnevna soba</a>
        </div>

        <div
          className="category"
          style={{ backgroundImage: `url(${SpavacaSoba})` }}
        >
          <a className="category-link" href="">
            Spavaća soba
          </a>
        </div>

        <div
          className="category"
          style={{ backgroundImage: `url(${RadnaSoba})` }}
        >
          <a className="category-link" href="">
            Radna soba
          </a>
        </div>

        <div
          className="category"
          style={{ backgroundImage: `url(${Kuhinja})` }}
        >
          <a className="category-link" href="">
            Kuhinja
          </a>
        </div>

        <div className="category" style={{ backgroundImage: `url(${Basta})` }}>
          <a className="category-link" href="">
            Bašta
          </a>
        </div>

        <div className="category" style={{ backgroundImage: `url(${Dodaci})` }}>
          <a className="category-link" href="">
            Dodaci
          </a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
