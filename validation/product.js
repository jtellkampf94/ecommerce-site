const Validator = require("validator");

const isEmpty = require("../utils/isEmpty");

module.exports = validateProduct = data => {
  let errors = {};
  let sanitizedData = {};

  let { name, imageUrl, price, category, description, sizes } = data;

  name = !isEmpty(name) ? name : "";
  description = !isEmpty(description) ? description : "";
  imageUrl = !isEmpty(imageUrl) ? imageUrl : "";
  price = !isEmpty(price) ? price : "";
  category = !isEmpty(category) ? category : [];
  sizes = !isEmpty(sizes) ? sizes : [];

  if (typeof name !== "string") {
    errors.name = "Please enter valid product name";
  } else {
    if (!Validator.isLength(name, { min: 2, max: 75 })) {
      errors.name = "Product name must be between 2 and 75 characters";
    }

    if (Validator.isEmpty(name)) {
      errors.name = "Please enter the product name";
    }
  }

  if (typeof description !== "string") {
    errors.description = "Please enter a valid product description";
  } else {
    if (!Validator.isLength(description, { max: 600 })) {
      errors.description = "Product description can't exceeded 600 characters";
    }

    if (Validator.isEmpty(description)) {
      errors.description = "Please enter the product description";
    }
  }

  if (typeof imageUrl !== "string") {
    errors.imageUrl = "Please provide valid image";
  } else {
    if (!Validator.isURL(imageUrl)) {
      errors.imageUrl = "Image is invalid";
    }

    if (Validator.isEmpty(imageUrl)) {
      errors.imageUrl = "Please upload image of product";
    }
  }

  if (typeof price === "string" && Validator.isEmpty(price)) {
    errors.price = "Please enter the price of the product";
  } else {
    if (typeof price !== "number") {
      errors.price = "Please enter valid product price";
    }
  }

  if (sizes.length === 0) {
    errors.sizes = "Please enter a size and quantity of product";
  } else {
    sizes.forEach(sizeElement => {
      if (typeof sizeElement.quantity !== "number") {
        errors.sizes = "Please enter a valid quantity of the size";
      }
      if (isEmpty(sizeElement.quantity)) {
        errors.sizes = "Please enter a quantity of the size";
      }
      if (typeof sizeElement.size !== "string") {
        errors.sizes = "Please enter a valid size";
      }
      if (isEmpty(sizeElement.size)) {
        errors.sizes = "Please enter a size";
      }
      if (typeof sizeElement !== "object") {
        errors.sizes = "Please enter valid size and quantity";
      }
    });
  }

  if (category.length === 0) {
    errors.category =
      "Please select the category or categories the product belongs to";
  } else {
    category.forEach(cgry => {
      if (typeof cgry !== "string") {
        errors.category = "Category / Categories are invalid";
      }

      if (
        cgry === "mens" ||
        cgry === "womens" ||
        cgry === "hats" ||
        cgry === "jackets" ||
        cgry === "trainers" ||
        cgry === "clothing" ||
        cgry === "gym & training" ||
        cgry === "running"
      ) {
        return;
      } else {
        errors.category =
          "Please select one or many of the categories suggested";
      }
    });
  }

  if (isEmpty(errors)) {
    sanitizedData.name = name;
    sanitizedData.description = description;
    sanitizedData.imageUrl = imageUrl;
    sanitizedData.price = price;
    sanitizedData.category = category;
    sanitizedData.sizes = sizes;
  }

  return { errors, isValid: isEmpty(errors), sanitizedData };
};
