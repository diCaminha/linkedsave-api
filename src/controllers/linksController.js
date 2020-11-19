exports.getLinks = (req, res) => {
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
    {
      id: 1,
      title: "Teste 1",
      linkUrl: "dedwfrewgegethgetheh",
    },
  ];
  res.status(200).json({
    message: "links fetched with success",
    data: links,
  });
};
