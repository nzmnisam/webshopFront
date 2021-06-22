import React from "react";
import SimilarProduct from "./SimilarProduct";

import "./SimilarProducts.css";

const SimilarProducts = ({ similarProducts, similarThumbnails }) => {
  return (
    <div className="similarProductsWrapper">
      <h2>Slični proizvodi</h2>
      <ul className="similarProducts">
        {similarProducts.map((product) => (
          <li key={product.id}>
            <SimilarProduct
              product={product}
              thumbnail={similarThumbnails[product.id]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarProducts;
