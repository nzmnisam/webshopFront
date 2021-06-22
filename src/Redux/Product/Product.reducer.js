import productTypes from "./Product.types";

const INITIAL_STATE = {
  productUploaded: false,
  productUpdated: false,
  products: [],
  productErrors: [],
  allProducts: [],
  product: null,
  productImages: [],
  similarProducts: [],
  similarThumbnails: null,
  productModel: null,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypes.UPLOAD_PRODUCT:
      return {
        ...state,
        productUploaded: action.payload,
      };
    case productTypes.UPDATE_PRODUCT:
      return {
        ...state,
        productUpdated: action.payload,
      };
    case productTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case productTypes.SET_UPDATED_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        }),
      };
    case productTypes.DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product.id !== action.payload
        ),
      };
    case productTypes.SET_PRODUCT_ERRORS:
      return {
        ...state,
        productErrors: action.payload,
      };
    case productTypes.FETCH_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    case productTypes.FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case productTypes.SET_PRODUCT_IMAGES:
      return {
        ...state,
        productImages: action.payload,
      };
    case productTypes.SET_SIMILAR_PRODUCTS: {
      return {
        ...state,
        similarProducts: action.payload,
      };
    }
    case productTypes.SET_THUMBNAILS: {
      return {
        ...state,
        similarThumbnails: action.payload,
      };
    }
    case productTypes.SET_MODEL:
      return {
        ...state,
        productModel: action.payload,
      };
    case productTypes.RESET_PRODUCTS:
      return {
        ...state,
        products: [],
        productErrors: [],
        productUploaded: false,
      };
    default:
      return state;
  }
};

export default productReducer;
