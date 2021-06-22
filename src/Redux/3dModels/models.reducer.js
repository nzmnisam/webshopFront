import modelsTypes from "./models.types";

const INITIAL_STATE = {
  model: "",
  uploadedModel: {},
  modelUploaded: false,
  setProductId: false,
  modelsErrors: [],
};

const modelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case modelsTypes.SET_MODELS: {
      return {
        ...state,
        model: action.payload,
      };
    }
    case modelsTypes.UPLOAD_MODELS:
      return {
        ...state,
        modelUploaded: action.payload,
      };
    case modelsTypes.SET_UPLOADED_MODELS:
      return {
        ...state,
        uploadedModel: action.payload,
      };
    case modelsTypes.SET_PRODUCT_ID:
      return {
        ...state,
        setProductId: action.payload,
      };
    case modelsTypes.SET_MODELS_ERRORS:
      return {
        ...state,
        modelsErrors: action.payload,
      };
    case modelsTypes.RESET_MODELS:
      return {
        ...state,
        model: "",
        uploadedModel: {},
        modelsUploaded: false,
        setProductId: false,
        modelsErrors: [],
      };
    default:
      return state;
  }
};

export default modelsReducer;
