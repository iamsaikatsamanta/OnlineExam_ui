const express= require('express'),
      router= express.Router(),
      AnswerController= require('../controller/answercontroller');

router.post('/saveanswer',AnswerController.onSaveAnswer);
router.post('/codecompile', AnswerController.onCodeCompile);
router.post('/coderun', AnswerController.onCodeRun);
module.exports = router;
