const currentUser = async (req, res) => {
  const { userName, email, theme } = req.user;

  res.json({
    userName,
    email,
    theme,
  });
};
export default currentUser;
