const Link = require('../models/link');

exports.getLinks = async (req, res) => {
    const links = await Link.find();
    
    res.status(200).json({
    message: "links fetched with success",
    data: links,
  });
};

exports.saveLink = async (req, res) => {
  const title = req.body.title;
  const linkUrl = req.body.linkUrl;
  const link = {
    id: null,
    title: title,
    linkUrl: linkUrl,
  };
  
  console.log(link);
  const linkSaved = await Link.create(link);

  res.status(201).json({
    message: "Link created with success",
    data: linkSaved,
  });
};
