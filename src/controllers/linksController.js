const urlMetadata = require("url-metadata");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Link = require("../models/link");

exports.getLinks = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);
    const links = await Link.find({ userId: tokenDecoded.userId });
    res.status(200).json({
      message: "links fetched with success",
      data: links,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error trying to get the links from the db: " + err,
    });
  }
};

exports.saveLink = async (req, res) => {
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
    const linkSaved = await Link.create(link);
    res.status(201).json({
      message: "Link created with success",
      data: linkSaved,
    });
  } catch (err) {
    console.log("Error occur: " + err);
    res.status(500).json({
      message: "error trying to save the link in the db: " + err,
    });
  }
};

exports.deleteLink = async (req, res) => {
  const linkId = req.params.id;
  await Link.deleteOne({ _id: linkId });
};

exports.readLink = async (req, res) => {
  try {
    const linkId = req.body.linkId;
    const result = await Link.update({ _id: linkId }, { read: true });
    res.status(200).json({
      message: "set as read with success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error trying to set link as read",
    });
  }
};

exports.getMetadataLink = async (req, res) => {
  try {
    const url = req.query.url;
    console.log(url);
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
    console.error(err);
    res.status(500).json({
      message: "error getting metadata",
    });
  }
};
