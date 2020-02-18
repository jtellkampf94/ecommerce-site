import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuid from "uuid/v1";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import CheckboxSection from "../checkbox-section/checkbox-section.component";
import ErrorMessage from "../error-message/error-message.component";
import SizeSection from "../size-section/size-section.component";

import handleCheckboxChange from "../../utils/handleCheckboxChange";
import { selectProductErrors } from "../../redux/product/product.selectors";
import {
  addAdminProductStart,
  adminUpdateProductStart
} from "../../redux/product/product.actions";

const ProductForm = ({ addProduct, updateProduct, product, productErrors }) => {
  const [productInfo, setProductInfo] = useState({
    name: product ? product.name : "",
    description: product ? product.description : "",
    file: null,
    price: product ? product.price.toString() : "",
    category: product ? product.category : []
  });

  const [stateSizes, setStateSizes] = useState({
    sizes: product
      ? product.sizes.map(sizeElement => ({ ...sizeElement, key: uuid() }))
      : [{ size: "", quantity: "", key: uuid() }]
  });

  const { name, description, category, file, price } = productInfo;
  const { sizes } = stateSizes;
  const categories = [
    "mens",
    "womens",
    "hats",
    "jackets",
    "trainers",
    "clothing",
    "gym & training",
    "running"
  ];
  const categorySectionTitle = "Product Category";
  const categorySectionText =
    "Please check the category this product belongs to, you may check more than one category";

  const handleChange = e => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleImageUploadChange = e => {
    setProductInfo({ ...productInfo, file: e.target.files[0] });
  };

  const handleSizesSectionChange = (e, key) => {
    const { name, value } = e.target;
    const sizesArray = [...sizes];
    const newSizesArray = sizesArray.map(sizeElement => {
      if (sizeElement.key === key) {
        return { ...sizeElement, [name]: value };
      } else {
        return { ...sizeElement };
      }
    });
    setStateSizes({ sizes: newSizesArray });
  };

  const handleUpdate = () => {
    productInfo.imageUrl = product.imageUrl;
    if (productInfo.price.length > 0) {
      productInfo.price = Number(productInfo.price);
    }

    const sizesArray = [...sizes];
    sizesArray.forEach(sizeElement => {
      delete sizeElement.key;
      sizeElement.quantity = parseInt(sizeElement.quantity);
    });

    productInfo.sizes = sizesArray;
    console.log(productInfo);
    updateProduct(productInfo, product._id);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const sizesArray = [...sizes];
    sizesArray.forEach(sizeElement => {
      delete sizeElement.key;
      sizeElement.quantity = Number(sizeElement.quantity);
    });

    const editedProductInfo = {
      ...productInfo,
      price: Number(productInfo.price),
      sizes: sizesArray
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
          values={categories}
          name="category"
          title={categorySectionTitle}
          text={categorySectionText}
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
            <CustomButton type="button" onClick={handleUpdate}>
              Edit
            </CustomButton>
          ) : (
            <CustomButton type="submit"> Add Product </CustomButton>
          )}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  productErrors: selectProductErrors
});

const mapDispatchToProps = dispatch => ({
  addProduct: prodInfo => dispatch(addAdminProductStart(prodInfo)),
  updateProduct: (product, productId) =>
    dispatch(adminUpdateProductStart(product, productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
