import categoryTypes from "./Category.types";

const INITIAL_STATE = {
  categories: [],
  categoryAncestors: {},
  filterCategories: [],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoryTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case categoryTypes.SET_CATEGORIES_ANCESTORS:
      return {
        ...state,
        categoryAncestors: action.payload,
      };
    case categoryTypes.SET_FILTER_CATEGORIES:
      return {
        ...state,
        filterCategories: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
