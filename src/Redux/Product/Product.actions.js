import productTypes from "./Product.types";
import axios from "axios";
import {
  setProductId,
  setProductIdUpdate,
  resetImages,
  setThumbnailsForSimilarProducts,
} from "../Images/Images.actions";
import { setProductIdModel, resetModels } from "../3dModels/models.action";

import { store } from "../createStore";
import { setFilterCategories } from "../Category/Category.actions";
import imagesTypes from "../Images/Images.types";

export const resetProducts = () => ({
  type: productTypes.RESET_PRODUCTS,
});

export const updateProduct = (product) => async (dispatch) => {
  if (!product.name) {
    const error = ["Niste uneli naziv"];
    dispatch({
      type: productTypes.SET_PRODUCT_ERRORS,
      payload: error,
    });
    return;
  }
  if (!product.price) {
    const error = ["Niste uneli cenu"];
    dispatch({
      type: productTypes.SET_PRODUCT_ERRORS,
      payload: error,
    });
    return;
  }

  try {
    const { images } = store.getState();
    const { models } = store.getState();
    const uploadedImages = images.uploadedImages;
    const uploadedModel = models.uploadedModel;
    let slug = "";
    const slugSplit = product.name.split(" ");
    slugSplit.forEach((value, i) => {
      if (i !== slugSplit.length - 1) {
        slug = slug + value + "-";
      } else {
        slug = slug + value;
      }
    });

    const putProduct = await axios.put(
      `http://127.0.0.1:8000/api/products/${product.id}`,

      {
        name: product.name,
        slug: slug,
        price: product.price,
        description: product.description,
        category_id: product.category,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const dbProduct = putProduct.data;
    dispatch({
      type: productTypes.UPDATE_PRODUCT,
      payload: true,
    });
    dispatch({
      type: productTypes.SET_UPDATED_PRODUCT,
      payload: dbProduct,
    });
    console.log(uploadedImages);
    if (uploadedImages[0] !== false) {
      console.log(uploadedImages);
      dispatch(
        setProductIdUpdate({ product: dbProduct, images: uploadedImages })
      );
      dispatch(resetImages());
    }
    if (uploadedModel) {
      dispatch(setProductIdModel({ product: dbProduct, model: uploadedModel }));
      dispatch(resetModels());
    }
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
  }
};

export const uploadProduct = (product) => async (dispatch) => {
  if (!product.name) {
    const error = ["Niste uneli naziv"];
    dispatch({
      type: productTypes.SET_PRODUCT_ERRORS,
      payload: error,
    });
    return;
  }
  if (!product.price) {
    const error = ["Niste uneli cenu"];
    dispatch({
      type: productTypes.SET_PRODUCT_ERRORS,
      payload: error,
    });
    return;
  }
  try {
    const { images } = store.getState();
    const { models } = store.getState();
    const uploadedImages = images.uploadedImages;
    const uploadedModel = models.uploadedModel;
    let slug = "";
    const slugSplit = product.name.split(" ");
    slugSplit.forEach((value, i) => {
      if (i !== slugSplit.length - 1) {
        slug = slug + value + "-";
      } else {
        slug = slug + value;
      }
    });

    const postProduct = await axios.post(
      `http://127.0.0.1:8000/api/products/`,

      {
        name: product.name,
        slug: slug,
        price: product.price,
        description: product.description,
        category_id: product.category,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const dbProduct = postProduct.data;
    dispatch({
      type: productTypes.UPLOAD_PRODUCT,
      payload: true,
    });
    dispatch({
      type: productTypes.ADD_PRODUCT,
      payload: product,
    });
    dispatch(setProductId({ product: dbProduct, images: uploadedImages }));
    dispatch(setProductIdModel({ product: dbProduct, model: uploadedModel }));
    dispatch(resetImages());
    dispatch(resetModels());
  } catch (error) {
    dispatch({
      type: productTypes.SET_PRODUCT_ERRORS,
      payload: error.response.data.errors.name,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const productDeletion = await axios.delete(
      `http://127.0.0.1:8000/api/products/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch({
      type: productTypes.DELETE_PRODUCT,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProducts = (categoryId) => async (dispatch) => {
  try {
    const { categoryFilters } = store.getState();

    console.log(categoryId);

    if (!categoryId) {
      axios
        .get(`http://127.0.0.1:8000/api/products`)
        .then((res) => {
          const products = res.data;
          dispatch({
            type: productTypes.FETCH_PRODUCTS,
            payload: products,
          });
        })
        .catch((error) => console.log(error));
    } else {
      const categorySlug = categoryId.split(" ")[0];
      // dispatch(setFilterCategories(nesto));
      let filterCategories = await axios.get(
        `http://127.0.0.1:8000/api/categories/subCategories/${categorySlug}`
      );
      filterCategories = filterCategories.data.subCategories;
      const categories = [];

      filterCategories.forEach((category) => {
        if (category.depth !== 0) {
          categories.push(category);
        }
      });
      // dispatch({
      //   type: categoryTypes.SET_FILTER_CATEGORIES,
      //   payload: categories,
      // });
      console.log(filterCategories, "string");
      if (filterCategories) {
        let categoryDepth = 0;
        filterCategories.forEach((category) => {
          if (category.depth > categoryDepth) {
            categoryDepth = category.depth;
          }
        });

        const categoryIds = [];

        filterCategories.forEach((category) => {
          if (category.depth === categoryDepth) {
            categoryIds.push(category.id);
          }
        });
        const catId = categoryIds.join(",");
        axios
          .get(`http://127.0.0.1:8000/api/products/categories/${catId}`)
          .then((res) => {
            const products = res.data;
            console.log(products);
            dispatch({
              type: productTypes.FETCH_PRODUCTS,
              payload: products,
            });
          })
          .catch((error) => console.log(error));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchProduct =
  (id, forEdit = false) =>
  async (dispatch) => {
    try {
      const productData = await axios.get(
        `http://127.0.0.1:8000/api/products/id/${id}`
      );
      dispatch({
        type: productTypes.FETCH_PRODUCT,
        payload: productData.data,
      });

      const productImages = await axios.get(
        `http://127.0.0.1:8000/api/images/${id}`
      );
      dispatch({
        type: productTypes.SET_PRODUCT_IMAGES,
        payload: productImages.data,
      });

      try {
        const productModel = await axios.get(
          `http://127.0.0.1:8000/api/models/${id}`
        );
        dispatch({
          type: productTypes.SET_MODEL,
          payload: productModel.data,
        });
      } catch (error) {
        if (error.response) console.log(error.response.data.message);
      }

      if (!forEdit) {
        const similarProductsReq = await axios.get(
          `http://127.0.0.1:8000/api/products/categories/${productData.data.category_id}`
        );

        const similarProducts = similarProductsReq.data.filter(
          (product) => product.id !== productData.data.id
        );

        dispatch({
          type: productTypes.SET_SIMILAR_PRODUCTS,
          payload: similarProducts,
        });

        let similarProductIds = "";
        similarProducts.forEach((similarProduct, index) => {
          if (index < similarProducts.length - 1)
            similarProductIds = similarProductIds + similarProduct.id + ",";
          else similarProductIds = similarProductIds + similarProduct.id;
        });
        console.log(similarProductIds);
        //probaj da posaljes product id,
        //uspesno :)
        const thumbnails = await axios.get(
          `http://127.0.0.1:8000/api/thumbnails/${similarProductIds}`
        );

        dispatch({
          type: productTypes.SET_THUMBNAILS,
          payload: thumbnails.data,
        });

        // fetch(`http://127.0.0.1:8000/api/models/${id}`)
        //   .then((res) => {
        //     // res.blob();
        //     return res.blob();
        //     // console.log(res);
        //   })
        //   .then((res) => {
        //     console.log(res);
        //     dispatch({
        //       type: productTypes.SET_MODEL,
        //       payload: res,
        //     });
        //   });
        // .then((pr) => console.log(pr));
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };
