const express = require('express'),
      router= express.Router(),
      User = require('../Models/user'),
      bcrypt = require('bcryptjs'),
      multer = require('multer'),
      jwt = require('jsonwebtoken') ;
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req,file,cb)=> {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error("Invalid Mime Type");
    if (isValid) {
      error = null;
    }
    cb(error,'backend/images/user');
  },
  filename: (require, file,cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});
router.post("/register",multer({storage: storage}).single('image') ,(req,res, next) =>{
  const url = req.protocol + '://' + req.get('host');
  bcrypt.hash(req.body.password ,10).then(hash =>{
    const user =new User({
      refId: 'OE'+ getRefId(),
      course: req.body.course,
      year: req.body.year,
      email: req.body.email,
      phoneno: req.body.phoneno,
      name: req.body.name,
      dob: req.body.dob,
      password: hash,
      img_url: url + '/images/user/' + req.file.filename
    });
    user.save().then(result =>{
      res.status(200).json({
        message: 'Registration Successful'
      });
    }).catch(error =>{
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
  });
});

router.post("/login", (req,res,next) => {
  let fetcheduser;
  User.findOne({refId: req.body.refId})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      fetcheduser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result=>{
      if(!result){
        return res.status(401).json({
          message: 'Auth Failed'
      });
      }
      const token = jwt.sign({refId: fetcheduser.refId, name: fetcheduser.name, img_url: fetcheduser.img_url},
        "The Hydrogen One Smartphone will come with an A3D Multi-dimensional surround sound and Red also says that it is a module, cinema-capable media which will be letting you add a power pack for increasing battery life and also expand phone’s memory or even attach a camera module with changeable mounts and these will be available in 2019. It also has a Holographic 4-View (H4V) recoding front and back with 3D experience and it also creates a depth map and adds two additional views (4V) in real time. There are a durable carbon fiber and functionally designed side controls on the device.",
        {expiresIn: '5m'}
      );
      res.status(200).json({
        token: token
      });
    })
    .catch(err =>{
      return res.status(401).json({
        message: 'Auth Failed'
      });
    });
});

function getRefId(){
  var d = new Date();
    var date = d.getFullYear().toString();
    if(d.getMonth()+1<10){
      date += '0'+(d.getMonth()+1);
    }else{
      date += (d.getMonth()+1);
    }
    if(d.getDate()<10){
      date += '0'+d.getDate();
    }else {
      date += d.getDate();
    }
    var refId = Math.floor(1000 + Math.random() * 9000);
    return date+refId
}

module.exports = router;
