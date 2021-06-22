import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  setCategories,
  setCategoryAncestors,
} from "../../Redux/Category/Category.actions";
import { setThumbnails } from "../../Redux/Images/Images.actions";
import { fetchProducts } from "../../Redux/Product/Product.actions";
import FormSelect from "../Forms/FromSelect/FormSelect";
import Button from "../Buttons/Button";

import Product from "./Product/Product";
import "./Products.css";

const mapState = ({ products, images, categories }) => ({
  allProducts: products.allProducts,
  thumbnails: images.thumbnails,

  productCategories: categories.categories,
  categoryAncestors: categories.categoryAncestors,
});

const Products = () => {
  const { allProducts, thumbnails, productCategories, categoryAncestors } =
    useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterCategory } = useParams();

  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [removeCategories, setRemoveCategories] = useState(false);
  let categoryPath = [];

  useEffect(() => {
    // if (allProducts.length === 0) {
    // let filter;
    // if (filterCategory) {
    //   filter = filterCategory.split(" ")[1];
    // }
    dispatch(fetchProducts(filterCategory));
    dispatch(setThumbnails());
    console.log(filterCategory);
    if (!filterCategory) dispatch(setCategories("proizvodi"));
    // }
  }, [filterCategory]);

  useEffect(() => {
    dispatch(setCategories("proizvodi"));
  }, [removeCategories]);

  useEffect(() => {
    if (category && category.length !== 0) {
      console.log(category);
      const slugSplit = category[category.length - 1].split(" ");
      const slug = slugSplit[0];
      dispatch(setCategories(slug));
    }
  }, [category]);

  useEffect(() => {
    if (filterCategory) {
      // dispatch(setCategories(filterCategory));
      // console.log(filterCategory.split(" ")[0]);
      dispatch(setCategoryAncestors(filterCategory.split(" ")[1]));
    }
  }, [filterCategory]);

  useEffect(() => {
    if (categoryAncestors.length !== 0) {
      console.log(categoryAncestors.categoryAncestors);
      setCategory(categoryAncestors.categoryAncestorsSlugs);
      setCategoryName(categoryAncestors.categoryAncestors);
    }
  }, [categoryAncestors]);

  const clearCategories = () => {
    setRemoveCategories(!removeCategories);
    setCategory([]);
    setCategoryName([]);
  };

  const clearCategoriesClick = (e) => {
    e.preventDefault();
    clearCategories();
    history.push("/search");
  };

  const renameCategoryKeys = (categories) => {
    categories = categories.map((category) => {
      category["value"] = category["slug"] + " " + category["id"];
      category["name"] = category["category_name"];
      return category;
    });
    return categories;
  };

  const categoriesOptions = () => {
    // console.log(productCategories);
    const categories = renameCategoryKeys(productCategories);
    categories.unshift({
      value: "0",
      name: "Izaberi kategoriju",
    });
    // console.log(categories);
    return categories;
  };

  const handleFilter = (e) => {
    console.log(e.target.value);
    //dodavanje vrednosti tipa slug id u state
    if (category)
      setCategory((previousCategories) => [
        ...previousCategories,
        e.target.value,
      ]);
    //dodavanje vrednosti tipa naziv selecta kategorije u state
    if (categoryName)
      setCategoryName((previousCategories) => [
        ...previousCategories,
        e.target.selectedOptions[0].text,
      ]);
    //dodavanje vrednosti select polja u rutu
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };
  const configFilters = {
    options: categoriesOptions(),
    handleChange: handleFilter,
  };

  if (!Array.isArray(allProducts)) {
    return (
      <div className="products">Greska prilikom ucitavanja proizvoda.</div>
    );
  }

  if (allProducts.length < 1) {
    return (
      <div className="products">
        <p>Nema proizvoda sa tim parametrima.</p>
        <Link to="/search">Nazad na proizvode</Link>
      </div>
    );
  }

  return (
    <div className="products">
      <h1 className="productsHeading">PROIZVODI</h1>

      {categoryName &&
        //ispis kategorija
        categoryName.map((value, i) => {
          categoryPath.push(value);
          return i !== category.length - 1 ? value + " > " : value;
        })}

      <FormSelect defaultValue={"0"} value={"0"} {...configFilters} />
      <Button onClick={clearCategoriesClick}>X</Button>

      <div className="productResults">
        {allProducts.map((product, index) => {
          const { name, price, category_id, sale_id, id } = product;
          const thumbnail = thumbnails[id];
          if (!name || typeof price === "undefined" || !category_id) {
            return null;
          }

          const configProduct = {
            name,
            price,
            category_id,
            sale_id,
            id,
            thumbnail,
          };
          //zasto ovde spread
          return <Product {...configProduct} key={id} />;
        })}
      </div>
    </div>
  );
};

export default Products;
