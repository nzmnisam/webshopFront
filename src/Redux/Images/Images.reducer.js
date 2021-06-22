import imagesTypes from "./Images.types";

const INITIAL_STATE = {
  images: [],
  uploadedImages: [],
  imagesUploaded: false,
  setProductId: false,
  setProductIdUpdate: false,
  imagesErrors: [],
  thumbnails: [],
};

const imagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case imagesTypes.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case imagesTypes.UPLOAD_IMAGES:
      return {
        ...state,
        imagesUploaded: action.payload,
      };
    case imagesTypes.SET_UPLOADED_IMAGES:
      return {
        ...state,
        uploadedImages: [...state.uploadedImages, action.payload],
      };
    case imagesTypes.SET_PRODUCT_ID:
      return {
        ...state,
        setProductId: action.payload,
      };
    case imagesTypes.SET_PRODUCT_ID_UPDATE:
      return {
        ...state,
        setProductIdUpdate: action.payload,
      };
    case imagesTypes.SET_IMAGES_ERRORS:
      return {
        ...state,
        imagesErrors: action.payload,
      };
    case imagesTypes.SET_THUMBNAILS: {
      return {
        ...state,
        thumbnails: action.payload,
      };
    }
    case imagesTypes.RESET_IMAGES:
      return {
        ...state,
        images: [],
        uploadedImages: [],
        imagesUploaded: false,
        setProductId: false,
        imagesErrors: [],
      };
    default:
      return state;
  }
};

export default imagesReducer;
