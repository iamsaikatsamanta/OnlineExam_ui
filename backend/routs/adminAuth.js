const express = require('express');
const router= express.Router();
const Admin = require('../Models/admin');
const bcrypt= require('bcrypt');

router.get("/admin/signup",(req,res,next) => {
  bcrypt.hash('ranjan2811', 10 ).then(hash => {
    const admin = new Admin({
      userid: 'ranjan@admin.com',
      password: hash,
      img_url: '/images/admin/ranjan.jpg'
    });
    admin.save().then(result => {
      res.status(201).json({
        message: 'Admin Created'
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });

});

module.exports = router;
