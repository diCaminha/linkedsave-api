const urlMetadata = require("url-metadata");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const asyncErrorHandler = require("../middleware/async-error-handler");
const ErrorHandler = require("../errorHandler");
const Link = require("../models/link");
const User = require("../models/user");

exports.getLinks = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);
    const user = await User.findOne({ _id: tokenDecoded.userId });
    console.log(user);
    res.status(200).json({
      message: "links fetched with success",
      data: user.links,
    });
  } catch (err) {
    next("error trying to get the links from the db: " + err, 500);
  }
};

exports.saveLink = asyncErrorHandler(async (req, res, next) => {
  const linkUrl = req.body.linkUrl;
  const metadata = await urlMetadata(linkUrl);
  const title = metadata.title;

  const token = req.headers.authorization.split(" ")[1];
  const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET);
  const userId = tokenDecoded.userId;

  const link = {
    id: null,
    title: title,
    linkUrl: linkUrl,
    image: metadata.image,
    source: metadata.source,
    description: metadata.description,
    userId: userId,
    read: false,
  };

  try {
    const user = await User.findOne({ _id: userId });
    console.log("user: " + user);
    user.links.push(link);
    user.counterReads = 0;
    const userSaved = await user.save(function () {});
    //const linkSaved = await Link.create(link);
    res.status(201).json({
      message: "Link created with success",
      data: userSaved,
    });
  } catch (err) {
    console.log(err);
    next(
      new ErrorHandler("error trying to save the link in the db: " + err, 500)
    );
  }
});

exports.deleteLink = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const tokenDecoded = jwt.decode(token);
  const user = await User.findOne({ _id: tokenDecoded.userId });
  const restLinks = user.links.filter((l) => l._id !== req.params.id);
  user.filters = restLinks;
  const userSaved = await user.save(function () {});
};

exports.readLink = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const linkId = req.body.linkId;
    const tokenDecoded = jwt.decode(token);
    const user = await User.findOne({ _id: tokenDecoded.userId });
    const linkRead = user.links.filter((l) => l._id == linkId)[0];
    console.log("testing...");
    console.log(linkRead);
    linkRead.read = true;
    user.counterReads = user.counterReads + 1;
    await user.save(function () {});
    //const result = await Link.update({ _id: linkId }, { read: true });

    res.status(200).json({
      message: "set as read with success",
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler("Error trying to read the link: " + err, 500));
  }
};

exports.getMetadataLink = async (req, res, next) => {
  try {
    const url = req.query.url;
    const metadata = await urlMetadata(url);
    const title = metadata.title;
    const link = {
      id: null,
      title: title,
      linkUrl: url,
      image: metadata.image,
      source: metadata.source,
      description: metadata.description,
      read: false,
    };

    res.status(200).json({
      data: link,
    });
  } catch (err) {
    next(
      new ErrorHandler("Error trying to get metadata for link: " + err, 500)
    );
  }
};
