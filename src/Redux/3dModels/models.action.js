import axios from "axios";
import modelsTypes from "./models.types";

export const resetModelsErrors = () => async (dispatch) => {
  try {
    dispatch({
      type: modelsTypes.SET_MODELS_ERRORS,
      payload: [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetModelsUploaded = () => async (dispatch) => {
  try {
    dispatch({
      type: modelsTypes.SET_UPLOADED_MODELS,
      payload: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setModels =
  ({ model }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: modelsTypes.SET_MODELS,
        payload: model,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const resetModels = () => ({
  type: modelsTypes.RESET_MODELS,
});

export const uploadModels =
  ({ modelPath, model }) =>
  async (dispatch) => {
    console.log(model);
    // console.log(Object.keys(model).length);
    if (!model) {
      const error = ["Niste izabrali model"];
      dispatch({
        type: modelsTypes.SET_MODELS_ERRORS,
        payload: error,
      });
      return;
    }

    try {
      const reader = new FileReader();
      let base64Model = "";
      reader.readAsDataURL(model);

      //await
      reader.onloadend = (e) => {
        base64Model = reader.result.replace(/^data:.+;base64,/, "");
        const name = model.name.split(".")[0];
        const splitPath = modelPath.split("/");
        const splitName = splitPath[splitPath.length - 1].split(" ");
        let slugName = "";
        splitName.forEach((value, i) => {
          if (i !== splitName.length - 1) {
            slugName = slugName + value + "-";
          } else {
            slugName = slugName + value;
          }
        });
        const slug = slugName + "-" + name;

        axios
          .post(
            `http://127.0.0.1:8000/api/models/`,

            {
              model_path: modelPath,
              model_name: name,
              slug: slug,
              model: base64Model,
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            const uploadedModel = res.data;

            dispatch({
              type: modelsTypes.UPLOAD_MODELS,
              payload: true,
            });
            dispatch({
              type: modelsTypes.SET_UPLOADED_MODELS,
              payload: uploadedModel,
            });
            dispatch({
              type: modelsTypes.SET_MODELS_ERRORS,
              payload: [],
            });
          })
          .catch((error) => {});
      };
    } catch (error) {
      console.log(error);
    }
  };

export const setProductIdModel =
  ({ product, model }) =>
  async (dispatch) => {
    if (!model) {
      console.log("nema modela");
      return;
    }
    try {
      await axios
        .put(
          `http://127.0.0.1:8000/api/models/product_id/${model.id}`,
          { product_id: product.id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch({
            type: modelsTypes.SET_PRODUCT_ID,
            payload: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
