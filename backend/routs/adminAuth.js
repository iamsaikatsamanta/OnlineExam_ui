const express = require('express'),
      router= express.Router(),
      Admin = require('../Models/admin'),
      adminauthcontroller= require('../controller/adminauthcontroller');

// router.get("/admin/signup",);

router.post("/login",adminauthcontroller.adminLogin);
router.post('/resetpasswordinit',adminauthcontroller.resetPassword);
module.exports = router;
