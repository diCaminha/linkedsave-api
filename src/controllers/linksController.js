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
