import axios from "axios";
import imagesTypes from "./Images.types";

//dodaj exceptione za greske

export const resetImagesErrors = () => async (dispatch) => {
  try {
    dispatch({
      type: imagesTypes.SET_IMAGES_ERRORS,
      payload: [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetImagesUploaded = () => async (dispatch) => {
  try {
    dispatch({
      type: imagesTypes.SET_UPLOADED_IMAGES,
      payload: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setImages =
  ({ images }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: imagesTypes.SET_IMAGES,
        payload: images,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const resetImages = () => ({
  type: imagesTypes.RESET_IMAGES,
});

export const uploadImages =
  ({ imagesPath, images }) =>
  (dispatch) => {
    if (images.length === 0) {
      const error = ["Niste izabrali slike"];
      dispatch({
        type: imagesTypes.SET_IMAGES_ERRORS,
        payload: error,
      });
      return;
    }

    try {
      images.forEach((image) => {
        const reader = new FileReader();
        let base64Image = "";
        reader.readAsDataURL(image);

        reader.onloadend = (e) => {
          base64Image = reader.result;
          const name = image.name.split(".")[0];
          const splitPath = imagesPath.split("/");
          const splitName = splitPath[splitPath.length - 1].split(" ");
          let slugName = "";
          splitName.forEach((value, i) => {
            if (i !== splitName.length - 1) {
              slugName = slugName + value + "-";
            } else {
              slugName = slugName + value;
            }
          });
          const slug = slugName + "-" + name + ".jpg";

          axios
            .post(
              `http://127.0.0.1:8000/api/images/`,

              {
                img_path: imagesPath,
                img_name: name,
                slug: slug,
                image: base64Image,
              },
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              const uploadedImages = res.data;
              // console.log(uploadedImages);
              dispatch({
                type: imagesTypes.UPLOAD_IMAGES,
                payload: true,
              });
              dispatch({
                type: imagesTypes.SET_UPLOADED_IMAGES,
                payload: uploadedImages,
              });
              dispatch({
                type: imagesTypes.SET_IMAGES_ERRORS,
                payload: [],
              });
            })
            .catch((error) => {
              if (error.response) {
                const errors = error.response.data.errors;
                //iteracija kroz propertije objekta
                for (let key in errors) {
                  dispatch({
                    type: imagesTypes.SET_IMAGES_ERRORS,
                    payload: errors[key],
                  });
                }
              }
            });
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

export const setProductId =
  ({ product, images }) =>
  async (dispatch) => {
    console.log("Usao u dispatch za slike");
    console.log(product, images);
    try {
      const imageIds = [];
      images.forEach((image) => {
        if (image !== false) {
          imageIds.push(image.id);
        }
      });
      const putProductID = await axios.put(
        `http://127.0.0.1:8000/api/images/product_id`,
        { product_id: product.id, image_ids: imageIds },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const response = putProductID.data;
      console.log(response);

      dispatch({
        type: imagesTypes.SET_PRODUCT_ID,
        payload: true,
      });
    } catch (error) {
      if (error.response) console.log(error.response.data.message);
    }
  };

export const setProductIdUpdate =
  ({ product, images }) =>
  async (dispatch) => {
    console.log("Usao u dispatch za slike");
    console.log(product, images);
    try {
      // const images = [];
      // images.forEach((image) => {
      //   if (image !== false) {
      //     imageIds.push(image.id);
      //   }
      // });
      const putProductID = await axios.put(
        `http://127.0.0.1:8000/api/images/product_id/update`,
        { product_id: product.id, b64_images: images },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const response = putProductID.data;
      console.log(response);

      dispatch({
        type: imagesTypes.SET_PRODUCT_ID_UPDATE,
        payload: true,
      });
    } catch (error) {
      if (error.response) console.log(error.response.data.message);
    }
  };

export const setThumbnails = () => async (dispatch) => {
  try {
    await axios
      .get(`http://127.0.0.1:8000/api/thumbnails`)
      .then((response) => {
        dispatch({
          type: imagesTypes.SET_THUMBNAILS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
