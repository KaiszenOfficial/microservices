const getUser = (req, res) => {
  return res.formatter.ok({ user: req.user });
};

module.exports = { getUser };