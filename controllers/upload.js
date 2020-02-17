const uuid = require("uuid/v1");

const Admin = require("../models/Admin");
const keys = require("../config/keys");
const s3 = require("../services/amazonS3");

exports.getPresignedURL = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (!admin)
      return res.status(403).json({
        message: "Sorry, you are not authorized to perform this action"
      });
    const key = `${req.user._id}/${uuid()}.jpg`;
    const url = await s3.getSignedUrl("putObject", {
      Bucket: keys.amazonS3BucketName,
      ContentType: "image/jpeg",
      Expires: 60,
      Key: key
    });
    return res.status(200).json({ url, key });
  } catch (err) {
    console.log(err);
    const error = new Error("Oops! Something went wrong with our servers");
    error.status = 500;
    next(error);
  }
};
