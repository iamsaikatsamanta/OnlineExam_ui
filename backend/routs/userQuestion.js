const express = require('express'),
  router= express.Router(),
  RegQuestion = require('../Models/regQuestion'),
  CodingQuestion = require('../Models/codingQuestion'),
  checkUserAuth = require('../middleware/check-user-auth');

router.get('/regular',(req,res,next) => {
  RegQuestion.find().then(question=>{
    res.status(200).json({
      message: 'Question Fetchted Successfully',
      questions: question.map(question=>{
        return {
          id: question._id,
          question: question.question,
          option: question.option
        };
      })
    });
  })
    .catch(err=>{
      res.status(500).json({
        err: err
      });
    });
});

router.get('/coding', (req,res,next) => {
  CodingQuestion.find()
    .then(codingQuestion => {
      res.status(200).json({
        message: 'Question Fetchted Successfully',
        codingQuestions: codingQuestion.map(question =>{
          return {
            id: question._id,
            question: question.question
          };
        })
      });
    })
    .catch(err => {
    res.states(500).json({
      err: err
    });
  })
});

module.exports = router;
