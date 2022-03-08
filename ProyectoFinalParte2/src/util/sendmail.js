const nodemailer = require("nodemailer");
const logger = require("./logger");

const TEST_MAIL = process.env.MAIL;
const PASSWORDMAIL = process.env.PASSWORDMAIL;

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: PASSWORDMAIL,
  },
});

module.exports = async function (mailOptions) {
  try {
    await transporter.sendMail(mailOptions);
    logger.info("Mail enviado");
  } catch (error) {
    logger.error("Error en el envio de mail" + error);
  }
};
