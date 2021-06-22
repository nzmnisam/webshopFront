import React from "react";
import "./SimilarProduct.css";

const SimilarProduct = ({ product, thumbnail }) => {
  return (
    <div className="productWrapper">
      {/* ne radi sa Link, ne refreshuje stranicu */}
      <a href={`/product/${product.id}`}>
        {product.name}
        <div className="productImage">
          <img
            src={"data:image/jpeg;base64," + thumbnail}
            alt=""
            className="productPicture"
          />
        </div>
      </a>
    </div>
  );
};

export default SimilarProduct;
