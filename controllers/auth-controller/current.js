const currentUser = async (req, res) => {
  const { userName, email } = req.user;

  res.json({
    userName,
    email,
  });
};
export default currentUser;
