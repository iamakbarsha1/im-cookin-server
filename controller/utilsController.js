exports.status = (req, res) => {
  return res.status(200).json({
    code: 200,
    Status: "Good!",
    reqData: req.body,
  });
};
