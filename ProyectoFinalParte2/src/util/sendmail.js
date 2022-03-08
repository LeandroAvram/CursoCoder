const nodemailer = require("nodemailer");

const TEST_MAIL = process.env.MAIL 

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: 'z4M37TufC1X1pMGqSZ',
  },
})

module.exports = async function (mailOptions) { 
    try {
        const info = await transporter.sendMail(mailOptions)
        //console.log(info)
      } catch (error) {
        //console.log(error)
      }
};