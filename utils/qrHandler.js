const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const PORT = 3000; // define port

const CREATE_QR = async (UData) => {
    try {
        const data = JSON.stringify(UData);

        // Ensure folder exists
        const dirPath = path.join(__dirname, 'private/qrcodes');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Clean filename (remove spaces)
        const safeName = UData.email.replace(/\s+/g, '_');

        const fileName = `qr_${safeName}_${Date.now()}.png`;
        const filePath = path.join(dirPath, fileName);

        // Generate QR
        await QRCode.toFile(filePath, data);

        const qrUrl = `http://10.216.27.18:${PORT}/qrcodes/${fileName}`;

        console.log("QR URL:", qrUrl);

        return ({ STATUS: true, URL :qrUrl, FILENAME :fileName });

    } catch (error) {
        console.error("QR Error:", error);
        return { STATUS: false };
    }
};

// // Proper async call
// (async () => {
//     let d = await CREATE_QR({
//         email: "kishore21092003@gmail.com",
//         name: "Kishore Kumar",
//         event: "GoEvent",
//         date: "2024-06-30"
//     });

//     console.log(d);
// })();

module.exports = CREATE_QR;
