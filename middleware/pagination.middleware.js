exports.paginationMiddleware = (defaultPageSize = 10, defaultPage = 1) => {
  return (req, res, next) => {
    const page = parseInt(req.query.page) || defaultPage;
    const pageSize = parseInt(req.query.pageSize) || defaultPageSize;

    // Ensure page and pageSize are positive integers
    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      return res
        .status(400)
        .send({ error: "page and pageSize must be positive integers" });
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Attach pagination data to the request obj.
    req.pagination = {
      page,
      limit: pageSize,
      startIndex,
      endIndex,
    };

    next(); // Call the next middleware
  };
};
