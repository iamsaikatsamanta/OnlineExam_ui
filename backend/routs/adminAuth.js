const express = require('express'),
      router= express.Router(),
      Admin = require('../Models/admin'),
      bcrypt= require('bcrypt'),
      jwt = require('jsonwebtoken');

// router.get("/admin/signup",(req,res,next) => {
//   bcrypt.hash('ranjan8211', 10 ).then(hash => {
//     const admin = new Admin({
//       userid: 'ranjan@admin.com',
//       name: 'Ranjan Das',
//       password: hash,
//       img_url: 'http://localhost:3000/images/admin/ranjan.jpg'
//     });
//     admin.save().then(result => {
//       res.status(201).json({
//         message: 'Admin Created'
//       });
//     }).catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
//   });
// });

router.post("/login",(req,res,next)=>{
  let fetchedAdmin;
  Admin.findOne({userid: req.body.username})
  .then(admin=>{
    if(!admin){
      return res.status(401).json({
        message: 'Authentication Failed'
      });
    }
    fetchedAdmin = admin;
    return bcrypt.compare(req.body.password, admin.password);
  })
  .then(result =>{
    if(!result) {
      return res.status(401).json({
        message: 'Authentication Failed'
      });
    }
    const token = jwt.sign({userid: fetchedAdmin.userid,
    name: fetchedAdmin.name,
    img_url: fetchedAdmin.img_url},
    "The Vivo V9 Pro has a 13MP primary camera sensor on the rear with f/2.2 aperture size and 2MP secondary camera sensor. Vivo has equipped the device with 16MP selfie camera and the device comes with 4G LTE connectivity along with Bluetooth, Wi-Fi, GPS and A-GPS. There is a 3260mAh battery on the back along with fast charging technology. Are you planning to get this device? Comment in the section below if you have any queries and stay tuned to PhoneRadar for more updates.",
    {expiresIn: '2h'}
    );
    res.status(200).json({
      adminToken: token
    });
  })
  .catch(Error =>{
    return res.status(401).json({
      message: 'Authentication Failed'
    });
  });
});
module.exports = router;
