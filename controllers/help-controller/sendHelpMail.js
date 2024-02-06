import { HttpError } from "../../helpers/index.js";
import SendEmail from "../../helpers/SendEmail.js";
import { User } from "../../models/User.js";

const EMAIL_TO = "taskpro.project@gmail.com";

const sendHelpMail = async (req, res) => {
  const { email, comment } = req.body;
  const result = await User.findOne({ email });
  if (!result) {
    throw HttpError(404, "User not found");
  }

  const helpEmail = {
    to: EMAIL_TO,
    subject: "Help email",
    html: `User <b>${email}</b> send email with comment: <b>"${comment}"</b>`,
  };
  await SendEmail(helpEmail);

  res.json({ message: "Help email sent" });
};

export default sendHelpMail;
