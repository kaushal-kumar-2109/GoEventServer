const nodemailer = require('nodemailer');
require('dotenv').config();


// Create a transporter object
const transporter = nodemailer.createTransport({
    host:process.env.EMAILHOST,
    port: 465,
    secure: true, // use SSL
    auth: {
      user:process.env.EMAIL,
      pass:process.env.PASSWORD,
    }
});

// .................................Email message creator ....................
// Configure the mailoptions object
function messageCreate(email,OTP){
    const otp = OTP;
    const mailOptions = {
        from: `"GoEvent: " Event Management`,
        to:`${email}`,
        subject:"One Time Password For Login ",
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2d89ef; text-align: center;">GoEvent Verification</h2>
          <p>Dear User,</p>
          <p>We received a request to verify your email address for <b>GoEvent</b>. Use the following One-Time Password (OTP) to complete your verification process:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 28px; font-weight: bold; color: #2d89ef; letter-spacing: 4px;">${otp}</span>
          </div>

          <p>This OTP is valid for <b>5 minutes</b>. Please do not share this code with anyone for security reasons.</p>
          
          <p style="margin-top: 30px;">Best regards,</p>
          <p><b>GoEvent Security Team</b></p>
          <hr />
          <small style="color: #555;">If you did not request this OTP, please ignore this email or contact our support team immediately.</small>
        </div>
        `
    };
    return({body:mailOptions,OTP:otp});
}

// Send the email
let sendMessage=async (data)=>{
    return new Promise((resolve,rejects)=>{
        const mail = messageCreate(data.UserEmail,data.OTP);
        transporter.sendMail(mail.body, function(error, info){
            if (error) {
              console.log('Error:', error);
              rejects({staus:false,err:error});
            } else {
              console.log('Email sent:', info.response);
              resolve({staus:true,otp:mail.OTP});
            }
          });
    });
};


module.exports = sendMessage;