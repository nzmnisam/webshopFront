import axios from "axios";
import categoryTypes from "./Category.types";

export const setCategories = (slug) => async (dispatch) => {
  try {
    axios.get(`http://127.0.0.1:8000/api/categories/${slug}`).then((res) => {
      const categories = [];
      res.data.categories.forEach((category) => {
        if (category.depth !== 0) {
          categories.push(category);
        }
      });
      dispatch({
        type: categoryTypes.SET_CATEGORIES,
        payload: categories,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// export const setFilterCategories = (slug) => async (dispatch) => {
//   try {
//     axios.get(`http://127.0.0.1:8000/api/categories/${slug}`).then((res) => {
//       const categories = [];
//       res.data.categories.forEach((category) => {
//         if (category.depth !== 0) {
//           categories.push(category);
//         }
//       });
//       dispatch({
//         type: categoryTypes.SET_FILTER_CATEGORIES,
//         payload: categories,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const setFilterCategories = (slug) => async (dispatch) => {
  try {
    axios
      .get(`http://127.0.0.1:8000/api/categories/subCategories/${slug}`)
      .then((res) => {
        const categories = [];
        res.data.subCategories.forEach((category) => {
          if (category.depth !== 0) {
            categories.push(category);
          }
        });
        dispatch({
          type: categoryTypes.SET_FILTER_CATEGORIES,
          payload: categories,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export const setCategoryAncestors = (slug) => async (dispatch) => {
  try {
    axios
      .get(`http://127.0.0.1:8000/api/categories/ancestors/${slug}`)
      .then((res) => {
        if (res.data.ancestors.length === 0) return;

        const categoryAncestors = res.data.ancestors[0].ancestors.split(",");
        categoryAncestors.push(res.data.ancestors[0].category);
        const categoryAncestorsSlugs = res.data.ancestors[0].slugs.split(",");
        categoryAncestorsSlugs.push(res.data.ancestors[0].slug);
        const categoryID = res.data.ancestors[0].id;
        const categoryAncestorsWithSlugs = {
          categoryAncestors,
          categoryAncestorsSlugs,
          categoryID,
        };
        dispatch({
          type: categoryTypes.SET_CATEGORIES_ANCESTORS,
          payload: categoryAncestorsWithSlugs,
        });
      });
  } catch (error) {
    console.log(error);
  }
};
