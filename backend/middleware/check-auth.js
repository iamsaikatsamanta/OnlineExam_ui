const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token =req.headers.authorization.split(" ")[1];
        jwt.verify(token, "The Vivo V9 Pro has a 13MP primary camera sensor on the rear with f/2.2 aperture size and 2MP secondary camera sensor. Vivo has equipped the device with 16MP selfie camera and the device comes with 4G LTE connectivity along with Bluetooth, Wi-Fi, GPS and A-GPS. There is a 3260mAh battery on the back along with fast charging technology. Are you planning to get this device? Comment in the section below if you have any queries and stay tuned to PhoneRadar for more updates.");
        next();
    }catch(error){
        res.status(401).json({
            message: 'Authentication Failed'
        });
    }
   
};