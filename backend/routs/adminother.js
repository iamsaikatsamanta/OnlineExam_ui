const express = require('express'),
      router= express.Router(),
      User = require('../Models/user');

router.get("/registeredCandidate", (req,res,next) =>{
      User.find()
      .then(users => {
            user = users.map(user => {
                  return {
                    refId: user.refId,
                    course: user.course,
                    name: user.name,
                    email: user.email
                  };
            });
            res.status(200).json({
                  message: 'Candidate Fetched Successfully',
                  candidate: user
            });
      })
      .then(err=>{
            res.status(501).json({
                  error: err
            });
      });
});

module.exports = router;
