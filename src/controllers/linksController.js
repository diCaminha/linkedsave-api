const links = [
  {
    id: 1,
    title: "Teste 1",
    linkUrl: "dedwfrewgegethgetheh",
  },
  {
    id: 1,
    title: "Teste 1",
    linkUrl: "dedwfrewgegethgetheh",
  },
];

exports.getLinks = (req, res) => {
  res.status(200).json({
    message: "links fetched with success",
    data: links,
  });
};

exports.saveLink = (req, res) => {
  const title = req.body.title;
  const linkUrl = req.body.linkUrl;
  const link = {
    id: null,
    title: title,
    linkUrl: linkUrl,
  };
  
  console.log(link);
  links.push(link);

  res.status(201).json({
    message: "Link created with success",
    data: link,
  });
};
