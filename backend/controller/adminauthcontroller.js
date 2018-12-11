const cripto=require('crypto'),
  Admin= require('../Models/admin'),
  bcrypt= require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  nodemailer= require('nodemailer'),
  sendgridtransport= require('nodemailer-sendgrid-transport');
const transpoter= nodemailer.createTransport(sendgridtransport({
  auth:{
    
  }
}));

// exports.registerAdmin = (req,res,next) => {
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
// };

exports.adminLogin = (req,res,next)=>{
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
};

exports.resetPassword = (req,res,next)=>{
  console.log('Hi From Reset Password');
  cripto.randomBytes(32, (err,buffer)=> {
    if (err) {
      res.status(501).josn({
        message: 'Reset Password Failed'
      });
    }
    const token = buffer.toString('hex');
    console.log(req.body);
    Admin.findOne({userid: req.body.username})
      .then(admin=>{
        console.log(!admin);
        if (!admin){
          res.status(204).json({
            message: 'You Are Not a Registered Admin'
          });
        }
        admin.resetToken = token;
        admin.tokenExpr = Date.now()+360000;
        return admin.save();
      })
      .then(admin=>{
        console.log(process.env.HOST);
      transpoter.sendMail({
        to: admin.email,
        from: 'onlinexm@akcsit.in',
        subject: 'Password Reset',
        html:`
          <p>You Request For Password Reset</p>
          <p>Click This <a href="${process.env.HOST}/${token}">${process.env.HOST}/${token}</a>To Set a New Password</p>
        `
      }).catch(err => {
        res.status(500).json({
          message: 'Reset Link Sending Failed',
          err: err
        });
      });
      }).then(result=>{
        res.status(201).json({
          message: 'Password Reset Link has been Sent'
        });
    }).catch(err=>{
        console.log(err);
      })
    ;
  });
};
