import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setCategories,
  setCategoryAncestors,
} from "../../Redux/Category/Category.actions";
import {
  resetImages,
  resetImagesErrors,
  resetImagesUploaded,
  setImages,
  setProductId,
  setThumbnails,
  uploadImages,
} from "../../Redux/Images/Images.actions";
import {
  setModels,
  uploadModels,
  resetModelsErrors,
  resetModelsUploaded,
  resetModels,
} from "../../Redux/3dModels/models.action";
import {
  deleteProduct,
  fetchProduct,
  fetchProducts,
  resetProducts,
  uploadProduct,
  updateProduct,
} from "../../Redux/Product/Product.actions";

import Button from "../../Components/Buttons/Button";
import FormSelect from "../../Components/Forms/FromSelect/FormSelect";
import FormInput from "../../Components/Forms/FormInput/FormInput";
import FormTextarea from "../../Components/Forms/FormTextarea/FormTextarea";

import Modal from "../../Components/Modal/Modal";

import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage/SuccessMessage";
import Dropzone from "react-dropzone-uploader";

import "react-dropzone-uploader/dist/styles.css";
import "./ProizvodiAdmin.css";

const mapState = ({ categories, images, products, models }) => ({
  productCategories: categories.categories,
  productImages: images.images,

  imagesErrors: images.imagesErrors,
  productErrors: products.productErrors,
  productUploaded: products.productUploaded,
  productModel: models.model,
  modelsErrors: models.modelsErrors,
  modelUploaded: models.modelUploaded,
  imagesUploaded: images.imagesUploaded,

  allProducts: products.allProducts,
  thumbnails: images.thumbnails,
  editProductImages: products.productImages,
  editProductModel: products.productModel,
  productUpdated: products.productUpdated,

  categoryAncestors: categories.categoryAncestors,
});

const ProizvodiAdmin = () => {
  const {
    productCategories,
    productImages,
    productModel,
    imagesErrors,
    productErrors,
    modelsErrors,
    productUploaded,
    modelUploaded,
    imagesUploaded,
    allProducts,
    thumbnails,

    editProductImages,
    editProductModel,
    categoryAncestors,
    productUpdated,
  } = useSelector(mapState);
  const dispatch = useDispatch();

  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  const [hideModal, setHideModal] = useState(true);
  const [exitProductModal, setExitProductModal] = useState(false);
  const [removeCategories, setRemoveCategories] = useState(false);
  let categoryPath = [];

  const [naziv, setNaziv] = useState("");
  const [cena, setCena] = useState("");
  const [opis, setOpis] = useState("");
  const [uploadedProduct, setUploadedProduct] = useState(false);

  const [productForEdit, setProductForEdit] = useState(false);
  const [productId, setProductId] = useState("");

  // let uploadedProduct = false;
  const [errors, setErrors] = useState([]);

  const [imageFilesForEdit, setImageFilesForEdit] = useState([]);
  const [defaultImage, setDefaultImage] = useState("");
  // const [modelFilesForEdit, setModelFilesForEdit] = useState([]);

  //fetch products and thumbnails and set default image when there is no thumbnail present
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(setThumbnails());
    setDefaultImage(b64Image());
  }, []);

  //convert default image to base 64
  const b64Image = () => {
    const img = new Image();
    img.src = "../../Assets/default.jpg";
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpg");
    return dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
  };

  const toggleModal = (productForEdit, id = null) => {
    setHideModal(!hideModal);
    setExitProductModal(!exitProductModal);
    setProductForEdit(false);
    setImageFilesForEdit([]);
    clearCategories();
    clearProducts();

    dispatch(resetImagesErrors());
    dispatch(resetModelsErrors());
    dispatch(resetModelsUploaded());
    dispatch(resetImagesUploaded());
    dispatch(resetProducts());
    setErrors([]);
  };

  //random image name generator, da ne bi bilo 0, 1, 2... kod setovanja slika u ImageSelect
  function makeImageName(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  //setovanje slika u image select prilikom izmnene proizvoda
  useEffect(() => {
    if (editProductImages) {
      if (!imageFilesForEdit.length) {
        console.log(editProductImages);
        setImageFilesForEdit(
          editProductImages.map((image, index) => {
            const byteCharacters = atob(image);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new File([byteArray], makeImageName(5) + ".jpg", {
              type: "image/jpeg",
            });
          })
        );
        // const file = new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' })
      }
    }
    if (editProductModel) {
    }
  }, [editProductImages, editProductModel]);

  //set category for editable product
  useEffect(() => {
    if (Object.keys(categoryAncestors).length !== 0) {
      console.log(categoryAncestors.categoryID);
      console.log(categoryAncestors.categoryAncestors);
      setCategory(categoryAncestors.categoryAncestorsSlugs);
      setCategoryName(categoryAncestors.categoryAncestors);
    }
  }, [categoryAncestors]);

  const toggleModalForEdit = (id) => {
    setHideModal(!hideModal);
    setExitProductModal(!exitProductModal);
    setProductForEdit(true);

    const product = allProducts.filter((product) => product.id === id);
    // console.log(product[0]);
    setNaziv(product[0].name);
    setCena(product[0].price);
    setOpis(product[0].description);
    setProductId(id);

    dispatch(fetchProduct(id, true));
    if (product[0]) dispatch(setCategoryAncestors(product[0].category_id));

    // showModalEditProduct(id);

    setImageFilesForEdit([]);

    // setModelFilesForEdit([]);

    dispatch(resetImagesErrors());
    dispatch(resetModelsErrors());
    dispatch(resetModelsUploaded());
    dispatch(resetImagesUploaded());

    dispatch(resetImages());
    //  dispatch(resetModels());
    // dispatch(resetProducts());
    setErrors([]);
  };

  const configModal = {
    hideModal,
    toggleModal,
  };

  //inicijalno setovanje kategorija za dodavanje prouizvoda
  useEffect(() => {
    if (
      (Array.isArray(productCategories) && productCategories.length === 0) ||
      exitProductModal
    ) {
      dispatch(setCategories("proizvodi"));
    }
  }, [exitProductModal, removeCategories]);

  //images errors
  useEffect(() => {
    if (imagesErrors.length > 0) {
      setErrors(imagesErrors);
      return;
    }
    if (imagesErrors.length === 0) {
      setErrors([]);
    }
  }, [imagesErrors]);

  //models errors
  useEffect(() => {
    if (modelsErrors.length > 0) {
      setErrors(modelsErrors);
      return;
    }
    if (modelsErrors.length === 0) {
      setErrors([]);
    }
  }, [modelsErrors]);

  //product errors
  useEffect(() => {
    if (productErrors.length > 0) {
      console.log("product errors");
      setErrors(productErrors);
      // dispatch(resetProducts());

      return;
    }
    if (productErrors.length === 0) {
      setErrors([]);
      // dispatch(resetProducts());
    }
  }, [productErrors]);

  //set category for product
  useEffect(() => {
    if (category.length !== 0) {
      const slugSplit = category[category.length - 1].split(" ");
      const slug = slugSplit[0];
      dispatch(setCategories(slug));
    }
  }, [category]);

  const clearCategories = () => {
    setRemoveCategories(!removeCategories);
    setCategory([]);
    setCategoryName([]);
  };

  const clearProducts = () => {
    // dispatch(resetProducts());
    setNaziv("");
    setCena("");
    setOpis("");
  };

  const clearCategoriesClick = (e) => {
    e.preventDefault();
    clearCategories();
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

  const imageSelectedHandler = (fileWithMeta, status, fileWithMetaArr) => {
    console.log(fileWithMeta, status, fileWithMetaArr);

    let imageFiles = fileWithMetaArr.map((fileObject) => fileObject.file);
    console.log(imageFiles);
    if (status === "removed") {
      imageFiles = imageFiles.filter((file) => file !== fileWithMeta.file);
    }
    dispatch(setImages({ images: imageFiles }));
  };

  const imageUploadHandler = (e) => {
    e.preventDefault();

    let imagesPath = "Resources/Images/";
    categoryName.forEach((category, index) => {
      imagesPath = imagesPath + category + "/";
    });
    imagesPath = imagesPath + naziv;

    if (!naziv || !cena) {
      setErrors(["Niste uneli podatke o proizvodu"]);
      return;
    }

    dispatch(
      uploadImages({
        imagesPath: imagesPath,
        images: productImages,
      })
    );
  };

  const modelSelectedHandler = (fileWithMeta, status, fileWithMetaArr) => {
    const modelFiles = fileWithMetaArr.map((fileObject) => fileObject.file);
    if (status === "removed") modelFiles.pop();
    console.log(modelFiles);
    dispatch(setImages({ model: modelFiles[0] }));
  };

  const modelUploadHandler = (e) => {
    e.preventDefault();
    let modelsPath = "Resources/3d models/";
    categoryName.forEach((category, index) => {
      modelsPath = modelsPath + category + "/";
    });
    modelsPath = modelsPath + naziv;

    if (!naziv || !cena) {
      setErrors(["Niste uneli podatke o proizvodu"]);
      return;
    }
    console.log(productModel);
    dispatch(
      uploadModels({
        modelPath: modelsPath,
        model: productModel,
      })
    );
  };

  const productUploadHandler = (e) => {
    e.preventDefault();
    if (category.length === 0) {
      setErrors(["Niste izabrali kategoriju"]);
      return;
    }

    const slugSplit = category[category.length - 1].split(" ");
    const categoryID = slugSplit[1];
    const product = {
      name: naziv,
      price: cena,
      description: opis,
      category: categoryID,
    };
    dispatch(uploadProduct(product));
  };

  const productUpdateHandler = (e, id) => {
    e.preventDefault();
    console.log("evo me da apdejtujem");
    if (category.length === 0) {
      setErrors(["Niste izabrali kategoriju"]);
      return;
    }

    const slugSplit = category[category.length - 1].split(" ");
    let categoryID = slugSplit[1];
    if (!categoryID) {
      categoryID = categoryAncestors.categoryID;
    }
    const product = {
      id: productId,
      name: naziv,
      price: cena,
      description: opis,
      category: categoryID,
    };
    // console.log(product);
    dispatch(updateProduct(product));
  };

  return (
    <div className="adminProducts">
      <div className="callToActions">
        <ul>
          <li key={1}>
            <Button onClick={() => toggleModal(false)}>Dodaj proizvod</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form>
            <h2>Unesi podatke o proizvodu</h2>
            {productUploaded && (
              <SuccessMessage
                success={"Proizvod uspešno dodat"}
                productUploaded={uploadedProduct}
              />
            )}
            {productUpdated && (
              <SuccessMessage
                success={"Proizvod uspešno izmenjen"}
                productUploaded={productUpdated}
              />
            )}
            <ErrorMessage errors={errors} />
            {categoryName.map((value, i) => {
              categoryPath.push(value);
              return i !== category.length - 1 ? value + " > " : value;
            })}

            <FormSelect
              defaultValue={"0"}
              value={"0"}
              onChange={(e) => {
                setCategory((previousCategories) => [
                  ...previousCategories,
                  e.target.value,
                ]);
                setCategoryName((previousCategories) => [
                  ...previousCategories,
                  e.target.selectedOptions[0].text,
                ]);
              }}
              options={categoriesOptions()}
            />
            <Button onClick={clearCategoriesClick}>X</Button>

            <FormInput
              type="text"
              placeholder="Naziv"
              label="Naziv"
              value={naziv}
              onChange={(e) => {
                setNaziv(e.target.value);
              }}
            />
            <FormInput
              type="text"
              placeholder="Cena"
              label="Cena"
              value={cena}
              onChange={(e) => {
                setCena(e.target.value);
              }}
            />
            <FormTextarea
              cols="56"
              rows="10"
              label="Opis"
              value={opis}
              onChange={(e) => {
                setOpis(e.target.value);
              }}
            ></FormTextarea>
          </form>
        </div>
        <div>
          <form>
            <Dropzone
              className="dropzone"
              styles={{
                dropzone: {
                  minHeight: 100,
                  maxHeight: 200,
                  marginBottom: "20px",
                  overflow: "auto",
                },
              }}
              onChangeStatus={imageSelectedHandler}
              initialFiles={imageFilesForEdit.length ? imageFilesForEdit : []}
            />
            <Button onClick={imageUploadHandler}>Dodaj slike</Button>

            <Dropzone
              styles={{
                dropzone: {
                  minHeight: 100,
                  maxHeight: 200,
                  marginBottom: "20px",
                  marginTop: "20px",
                  overflow: "auto",
                },
              }}
              onChangeStatus={modelSelectedHandler}
              maxFiles={1}
              multiple={false}
            />
            <Button onClick={modelUploadHandler}>Dodaj 3d model</Button>

            {productForEdit ? (
              <Button
                onClick={(e) => {
                  productUpdateHandler(e);
                }}
              >
                Izmeni proizvod
              </Button>
            ) : (
              <Button onClick={productUploadHandler}>Dodaj proizvod</Button>
            )}

            {imagesUploaded && (
              <SuccessMessage
                success={"Slike dodate"}
                imagesUploaded={imagesUploaded}
              />
            )}
            {modelUploaded && (
              <SuccessMessage
                success={"Model dodat"}
                imagesUploaded={modelUploaded}
              />
            )}
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th className="editProductsRow">
                <h1 className="editProductsTitle">Proizvodi</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="productsTable"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {allProducts.map((product) => {
                      const { id, name, price } = product;
                      const thumbnail = thumbnails[id]
                        ? thumbnails[id]
                        : defaultImage;
                      return (
                        <tr key={id}>
                          <td>
                            <img
                              className="thumb"
                              src={"data:image/jpeg;base64," + thumbnail}
                              alt=""
                            />
                          </td>
                          <td>{name}</td>
                          <td>{price} RSD</td>
                          <td>
                            <Button
                              onClick={() => {
                                toggleModalForEdit(id);
                              }}
                            >
                              Izmeni
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => {
                                dispatch(deleteProduct(id));
                              }}
                            >
                              Obriši
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProizvodiAdmin;
