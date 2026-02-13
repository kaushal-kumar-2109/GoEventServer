const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require("path");


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
function messageCreate(email, name, event, qrFileName) {

    const mailOptions = {
        from: '"GoEvent - Event Management" <no-reply@goevent.com>',
        to: email,
        subject: `🎉 You're Invited to ${event.EVENTNAME}!`,
        html: `
        <div style="font-family: 'Segoe UI', sans-serif; background: #f2f5f9; padding: 40px 15px;">
          
          <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 35px rgba(0,0,0,0.12);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #6a11cb, #2575fc); padding: 45px 25px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 34px;">🎊 You're Invited</h1>
              <p style="margin-top: 12px; font-size: 18px;">
                Hosted by <strong>${name}</strong>
              </p>
            </div>

            <!-- Event Title -->
            <div style="padding: 35px 30px 10px 30px; text-align: center;">
              <h2 style="font-size: 28px; color: #333;">
                ${event.EVENTNAME}
              </h2>
            </div>

            <!-- Invitation Message -->
            <div style="padding: 10px 40px 25px 40px; text-align: center;">
              <p style="font-size: 16px; color: #555; line-height: 1.8;">
                With great pleasure, <strong>${name}</strong> invites you to be part of 
                <strong>${event.EVENTNAME}</strong>.  
                This special event promises memorable moments, exciting experiences, 
                and meaningful connections. Your presence will truly make this occasion 
                more joyful and unforgettable.
              </p>
            </div>

            <!-- Event Details -->
            <div style="padding: 0 30px 30px 30px;">
              <div style="background: #f8f9fc; border-radius: 12px; padding: 25px;">
                <p>📅 <strong>Date:</strong> ${event.EVENTDATE}</p>
                <p>⏰ <strong>Time:</strong> ${event.EVENTTIME}</p>
                <p>📍 <strong>Location:</strong> ${event.EVENTLOCATION}</p>
              </div>
            </div>

            <!-- About -->
            <div style="padding: 0 30px 20px 30px;">
              <h3 style="color: #2575fc;">About the Event</h3>
              <p style="color: #555; line-height: 1.7;">
                ${event.EVENTABOUT}
              </p>
            </div>

            <!-- Highlights -->
            <div style="padding: 0 30px 25px 30px;">
              <h3 style="color: #6a11cb;">✨ Event Highlights</h3>
              <p style="color: #555; line-height: 1.7;">
                ${event.EVENTHIGHLIGHT}
              </p>
            </div>

            <!-- QR Section -->
            <div style="padding: 30px; text-align: center; border-top: 1px solid #eee;">
              <h3 style="color: #333;">🎟 Your Entry QR Code</h3>
              
              <p style="color: #555; font-size: 15px; line-height: 1.7;">
                Please present the QR code below at the event entrance for quick and smooth check-in.
                You can either scan it directly from this email or download the attached QR code image
                and keep it saved on your device.
              </p>

              <img src="cid:eventqr" 
                   style="width: 180px; margin-top: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.15);" />

              <p style="margin-top: 15px; font-size: 13px; color: #777;">
                (QR Code is also attached to this email for download.)
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f1f1; padding: 18px; text-align: center; font-size: 12px; color: #777;">
              © ${new Date().getFullYear()} GoEvent. Making Moments Memorable.
            </div>

          </div>
        </div>
        `,
        attachments: [
            {
                filename: qrFileName,
                path: path.join(__dirname, "./private/qrcodes", qrFileName),
                cid: "eventqr"  // Must match img src
            }
        ]
    };

    return mailOptions;
}

// Send the email
let sendMessage=async (data,event,qr)=>{
    return new Promise((resolve,rejects)=>{
        const mail = messageCreate(data.email,data.name,event,qr);
        transporter.sendMail(mail, function(error, info){
            if (error) {
              console.log('Error:', error);
              rejects({STATUS:500,MES:"There is an server error"});
            } else {
              console.log('Email invitation sent:', info.response);
              resolve ({STATUS:200,MES:"invitation send sucessfully"});
              // return ({staus:true,otp:mail.OTP});
            }
          });
    });
};


module.exports = sendMessage;