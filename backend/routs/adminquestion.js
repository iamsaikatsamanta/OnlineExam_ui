const express = require('express'),
      router = express.Router(),
      RegQuestion = require('../Models/regQuestion'),
      CodeingQuestion = require('../Models/codingQuestion'),
      checkAuth = require('../middleware/check-auth');

router.post("/savequestion",checkAuth,(req,res,next)=>{
    const question = new RegQuestion({
        question: req.body.question,
        option: req.body.option,
        correct: req.body.correct
    });
    question.save()
    .then(savedQuestion => {
        res.status(201).json({
            message: 'Question Saved Successfully',
            questionId: savedQuestion._id
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    }); 
});

router.post("/savecodingquestion",checkAuth, (req,res,next) => {
    const codingQuestion = new CodeingQuestion({
        question: req.body.question,
        inputtc1: req.body.inputtc1,
        outputtc1: req.body.outputtc1,
        inputtc2: req.body.inputtc2,
        outputtc2: req.body.outputtc2,
    });
    codingQuestion.save().then(savedCodingQuestion=>{
        res.status(201).json({
            message: 'Coding Question Saved Successfully',
            questionId: savedCodingQuestion._id
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
});

router.get("/getquestion",checkAuth,(req,res,next)=>{
    RegQuestion.find().then(question=>{
        res.status(200).json({
            message: 'Question Fetchted Successfully',
            questions: question
        });
    })
    .catch(err=>{
        res.status(500).json({
            err: err
        });
    });
});

router.get("/getcodingquestion",checkAuth,(req,res,next)=>{
    CodeingQuestion.find().then(CodeingQuestions=>{
        res.status(200).json({
            message: 'Coding Question Fetchted Successfully',
            codingQuestion: CodeingQuestions
        });
    }).catch(err=>{
        res.status(500).json({
            err: err
        });
    });
});

module.exports = router;
