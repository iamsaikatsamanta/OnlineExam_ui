const express = require('express'),
    router = express.Router(),
    RegQueston = require('../Models/regQuestion'),
    Marks= require('../Models/marks');

router.post('/saveanswer',(req,res,next) => {
    console.log(req.body.option);
    RegQueston.findOne({_id: option.questionId})
    .then(question=>{
        if (question.correct === option.answer){
            Marks.findOne({})
            .then(marks=> {
                
            })
            .catch(err=>{
                res.status(401).json({
                    message: 'Failed to Save Answer'
                });  
            })
        }
    })
    .catch(err=> { 
        res.status(401).json({
            message: 'Failed to Save Answer'
        });
    });
});
module.exports = router;