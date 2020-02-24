import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuid from "uuid/v1";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import CheckboxSection from "../checkbox-section/checkbox-section.component";
import ErrorMessage from "../error-message/error-message.component";
import SizeSection from "../size-section/size-section.component";
import DeleteProduct from "../delete-product/delete-product.component";

import handleCheckboxChange from "../../utils/handleCheckboxChange";
import { selectProductErrors } from "../../redux/product/product.selectors";
import { selectViewModal } from "../../redux/ui/ui.selectors";
import {
  addAdminProductStart,
  adminUpdateProductStart,
  adminDeleteProductStart
} from "../../redux/product/product.actions";
import { showModal, closeModal } from "../../redux/ui/ui.actions";

const CATEGORY_DATA = {
  categories: [
    "mens",
    "womens",
    "hats",
    "jackets",
    "trainers",
    "clothing",
    "gym & training",
    "running"
  ],
  categorySectionTitle: "Product Category",
  categorySectionText:
    "Please check the category this product belongs to, you may check more than one category"
};

const ProductForm = ({
  addProduct,
  updateProduct,
  product,
  productErrors,
  viewModal,
  deleteProduct,
  showModal,
  closeModal
}) => {
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    file: null,
    imageUrl: "",
    price: product ? product.price.toString() : "",
    category: product ? product.category : []
  });

  const [stateSizes, setStateSizes] = useState({
    sizes: [{ size: "", quantity: "", identityKey: uuid() }]
  });

  useEffect(() => {
    if (product) {
      setProductInfo({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price.toString(),
        category: product.category
      });
      setStateSizes({
        sizes: product.sizes.map(sizeElement => ({
          size: sizeElement.size,
          quantity: sizeElement.quantity.toString(),
          identityKey: uuid()
        }))
      });
    }
  }, [product]);

  const { name, description, category, price } = productInfo;
  const { sizes } = stateSizes;

  const handleChange = e => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleImageUploadChange = e => {
    setProductInfo({ ...productInfo, file: e.target.files[0] });
  };

  const handleSizesSectionChange = (e, identityKey) => {
    const { name, value } = e.target;
    const sizesArray = [...sizes];
    const newSizesArray = sizesArray.map(sizeElement => {
      if (sizeElement.identityKey === identityKey) {
        return { ...sizeElement, [name]: value };
      } else {
        return { ...sizeElement };
      }
    });
    setStateSizes({ sizes: newSizesArray });
  };

  const handleUpdate = () => {
    const updateProductInfo = {
      ...productInfo,
      sizes: sizes.map(el => ({ size: el.size, quantity: el.quantity }))
    };
    console.log(updateProductInfo);
    updateProduct(updateProductInfo, product._id);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const editedProductInfo = {
      ...productInfo,
      sizes: sizes.map(el => ({ size: el.size, quantity: el.quantity }))
    };
    addProduct(editedProductInfo);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          name="name"
          type="text"
          value={name}
          handleChange={handleChange}
          label="Product Name"
          required
        />
        {productErrors.name && <ErrorMessage message={productErrors.name} />}
        <div className="group">
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        {productErrors.description && (
          <ErrorMessage message={productErrors.description} />
        )}
        <div className="group">
          <label htmlFor="file">Product Image</label>
          <input
            name="file"
            id="file"
            type="file"
            accept="image/*"
            onChange={handleImageUploadChange}
          />
        </div>
        {product && (
          <div>
            <small>
              If you do not wish to change product image below, do not attatch
              file
            </small>
            <img src={product.imageUrl} alt={`${product.name} image`} />
          </div>
        )}
        {productErrors.imageUrl && (
          <ErrorMessage message={productErrors.imageUrl} />
        )}
        <CheckboxSection
          state={productInfo}
          handleChange={e =>
            handleCheckboxChange(
              e,
              category,
              setProductInfo,
              productInfo,
              "category"
            )
          }
          values={CATEGORY_DATA.categories}
          name="category"
          title={CATEGORY_DATA.categorySectionTitle}
          text={CATEGORY_DATA.categorySectionText}
        />
        {productErrors.category && (
          <ErrorMessage message={productErrors.category} />
        )}
        <SizeSection
          handleChange={handleSizesSectionChange}
          sizes={sizes}
          setStateSizes={setStateSizes}
        />

        {productErrors.sizes && <ErrorMessage message={productErrors.sizes} />}
        <div className="group">
          <label htmlFor="price">Price £</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={handleChange}
            step="0.01"
          />
        </div>
        {productErrors.price && <ErrorMessage message={productErrors.price} />}
        {productErrors.error && <ErrorMessage message={productErrors.error} />}
        <div className="buttons">
          {product ? (
            <React.Fragment>
              <CustomButton type="button" onClick={handleUpdate}>
                Edit
              </CustomButton>
              <CustomButton type="button" onClick={showModal}>
                Delete
              </CustomButton>
            </React.Fragment>
          ) : (
            <CustomButton type="submit"> Add Product </CustomButton>
          )}
          {product ? (
            viewModal ? (
              <DeleteProduct
                id={product._id}
                deleteProduct={deleteProduct}
                name={product.name}
                closeModal={closeModal}
              />
            ) : null
          ) : null}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  productErrors: selectProductErrors,
  viewModal: selectViewModal
});

const mapDispatchToProps = dispatch => ({
  addProduct: prodInfo => dispatch(addAdminProductStart(prodInfo)),
  updateProduct: (product, productId) =>
    dispatch(adminUpdateProductStart(product, productId)),
  closeModal: () => dispatch(closeModal()),
  showModal: () => dispatch(showModal()),
  deleteProduct: productId => dispatch(adminDeleteProductStart(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
