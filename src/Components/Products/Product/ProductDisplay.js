import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../Redux/Product/Product.actions";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import ImageGallery from "react-image-gallery";
// import Model from "../../../astronaut/Astronaut.gltf";
// import ModelViewer from "react-model-viewer";

import Button from "../../Buttons/Button";
import "./ProductDisplay.css";

const mapState = ({ products }) => ({
  product: products.product,
  similarProducts: products.similarProducts,
  similarThumbnails: products.similarThumbnails,
  images: products.productImages,
  model: products.productModel,
});

const ProductDisplay = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, images, model, similarProducts, similarThumbnails } =
    useSelector(mapState);
  const [modelUrl, setModelUrl] = useState("");
  let imagesForGallery = [];

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  // const b64ToFile = (b64) => {
  //   return atob(b64);
  // };

  // if (model) {
  //   // console.log(model);
  //   const createModelUrl = URL.createObjectURL(model);
  //   if (modelUrl === "") setModelUrl(createModelUrl);
  // }

  images &&
    images.forEach((image) => {
      const imageForGallery = {
        original: "data:image/jpeg;base64," + image,
        thumbnail: "data:image/jpeg;base64," + image,
      };
      imagesForGallery.push(imageForGallery);
    });

  return (
    <div>
      {product && (
        <div className="productDisplayWrapper">
          <h1>{product.name}</h1>
          <ImageGallery
            items={imagesForGallery}
            showPlayButton={false}
            originalWidth={"300"}
            originalHeight={"auto"}
            // thumbnailHeight="20"
            // thumbnailWidth="20"
          ></ImageGallery>
          <div className="productInfo">
            <div className="addToCartInfo">
              <div className="priceInfo">{product.price}RSD</div>
              <div className="btnDodajUKorpu">
                <Button>Dodaj u korpu</Button>
              </div>
            </div>

            <div className="descrpition">{product.description}</div>
          </div>
        </div>
      )}
      {similarProducts[0] && similarThumbnails && (
        <SimilarProducts
          similarProducts={similarProducts}
          similarThumbnails={similarThumbnails}
        />
      )}
    </div>
  );
};

export default ProductDisplay;
