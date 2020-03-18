const Product = require("../models/Product");
const Admin = require("../models/Admin");
const keys = require("../config/keys");
const s3 = require("../services/amazonS3");
const validateProduct = require("../validation/product");

exports.postProduct = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (!admin)
      return res.status(403).json({
        error: "Sorry, you are not authorized to perform this action"
      });

    const { isValid, errors, sanitizedData } = validateProduct(req.body);

    if (!isValid) return res.status(422).json(errors);

    const product = await Product.create({
      ...sanitizedData,
      adminId: req.user._id
    });
    return res.status(201).json(product);
  } catch (err) {
    console.log(err);
    const error = new Error();
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;

    const results = {};

    results.itemsCount = await Product.countDocuments().exec();
    results.results = await Product.find()
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    const error = new Error();
    next(error);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;

    const results = {};

    if (req.params.category === "gym&training") {
      req.params.category = "gym & training";
    }

    results.itemsCount = await Product.countDocuments({
      category: req.params.category
    }).exec();

    if (results.itemsCount === 0)
      return res.status(200).json({
        error: "There are no products available in this category"
      });

    results.results = await Product.find({ category: req.params.category })
      .limit(limit)
      .skip(startIndex)
      .exec();
    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    const error = new Error();
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product)
      return res
        .status(400)
        .json({ error: "No product with this ID is found" });
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError" || "CastError")
      return res
        .status(400)
        .json({ error: "No product with this ID is found" });
    const error = new Error();
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (!admin)
      return res.status(403).json({
        error: "Sorry, you are not authorized to perform this action"
      });
    const product = await Product.findById(req.params.productId);

    if (!product)
      return res
        .status(400)
        .json({ error: "No product with this ID is found" });
    if (product.adminId.toString() !== req.user._id)
      return res.status(403).json({
        error: "Sorry, you are not authorized to perform this operation"
      });

    const url = product.imageUrl;
    const key = url.slice(55, url.length);
    const params = {
      Bucket: keys.amazonS3BucketName,
      Key: key
    };
    s3.getObject(params, (err, data) => {
      if (!data) {
        return res.status(404).json({ error: "Product image wasn't found" });
      }
    });

    s3.deleteObject(params, async (err, data) => {
      if (Object.entries(data).length === 0) {
        await product.remove();
        return res.status(200).json(product);
      }
    });
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError" || "CastError")
      return res
        .status(400)
        .json({ error: "No product with this ID is found" });
    const error = new Error();
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (!admin)
      return res.status(403).json({
        error: "Sorry, you are not authorized to perform this action"
      });

    const product = await Product.findById(req.params.productId);
    if (!product)
      return res
        .status(400)
        .json({ error: "No product with this ID is found" });
    if (product.adminId.toString() !== req.user._id)
      return res.status(403).json({
        error: "Sorry, you are not authorized to perform this operation"
      });

    const { isValid, errors, sanitizedData } = validateProduct(req.body);

    if (!isValid) return res.status(422).json(errors);

    if (product.imageUrl === req.body.imageUrl) {
      sanitizedData.adminId = admin._id;
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.productId },
        sanitizedData,
        { new: true, overwrite: true }
      );
      return res.status(200).json(updatedProduct);
    } else {
      const url = product.imageUrl;
      const key = url.slice(55, url.length);
      const params = {
        Bucket: keys.amazonS3BucketName,
        Key: key
      };
      s3.getObject(params, (err, data) => {
        if (!data) {
          return res.status(404).json({ error: "Product image wasn't found" });
        }
      });

      s3.deleteObject(params, async (err, data) => {
        if (Object.entries(data).length === 0) {
          sanitizedData.adminId = admin._id;
          const updatedProduct = await Product.findOneAndUpdate(
            { _id: req.params.productId },
            sanitizedData,
            { new: true, overwrite: true }
          );
          return res.status(200).json(updatedProduct);
        }
      });
    }
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError" || "CastError")
      return res
        .status(400)
        .json({ error: "No product with this ID is found" });
    const error = new Error();
    next(error);
  }
};
