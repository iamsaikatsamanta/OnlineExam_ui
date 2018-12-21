const User = require('../Models/user'),
      Masrks= require('../Models/marks'),
      RegQuestion= require('../Models/regQuestion'),
      {c, cpp, java, python} = require('compile-run'),
      fs= require('fs');

exports.onSaveAnswer = (req, res, next)=>{
  RegQuestion.findOne({_id: req.body.questionId})
    .then(question=>{
      if( question.correct === req.body.option){
        Masrks.findOne({user: req.body.userId}).then(marks=>{
          marks.questionmarks += 2;
          marks.total= marks.questionmarks + marks.codingmarks;
          marks.save();
        });
      }else {
        Masrks.findOne({user: req.body.userId}).then(marks=>{
          marks.questionmarks -= 1;
          marks.total= marks.questionmarks + marks.codingmarks;
          marks.save();
        });
      }
      res.status(200).json({
        message: 'Answer Saved'
      });
    })
    .cache(err => {
      res.status(500).json({
        message: 'Save Failed Internal Server Error'
      });
    });
};
  exports.onCodeCompile = async (req, res, next)=>{
    console.log(req.body);
  const ext = req.body.lang;
  const filename = req.body.userId;
  if (ext === 'C' ){
    await fs.writeFile('./backend/codingFile/'+filename+'.c', req.body.code, (err)=>{
      if (err)
        console.log(err);
    });
    let resultPromiseC = c.runFile('./backend/codingFile/'+filename+'.c');
    resultPromiseC
      .then(result =>{
        if (result.stderr === '') {
          res.status(200).json({
            status: 0,
            message: 'Compilation Successful'
          })
        } else {
          res.status(200).json({
            status: 1,
            message: 'Error Occurred',
            error: result.stderr
          })
        }
      })
      .catch(err=>{
        res.status(500).json({
          status: 1,
          message: 'Error Occurred',
          error: err
        });
      });
  } else if (ext === 'C++' ){
    await fs.writeFile('./backend/codingFile/'+filename+'.cpp', req.body.code, (err)=>{
      if (err)
        console.log(err);
    });
    let resultPromiseCpp = cpp.runFile('./backend/codingFile/'+filename+'.cpp');
    resultPromiseCpp
      .then(result =>{
        if (result.stderr === '') {
          res.status(200).json({
            status: 0,
            message: 'Compilation Successful'
          })
        } else {
          res.status(200).json({
            status: 1,
            message: 'Error Occurred',
            error: result.stderr
          })
        }
      })
      .catch(err=>{
        res.status(500).json({
          status: 1,
          message: 'Error Occurred',
          error: err
        });
      });
  } else if (ext === 'JAVA' ){
    await fs.writeFile('./backend/codingFile/'+filename+'/Main.java', req.body.code, (err)=>{
    if (err)
        console.log(err);
    });
    let resultPromiseJava = java.runFile('./backend/codingFile/'+filename+'/Main.java');
    resultPromiseJava
      .then(result =>{
        if (result.stderr === '') {
          res.status(200).json({
            status: 0,
            message: 'Compilation Successful'
          })
        } else {
          res.status(200).json({
            status: 1,
            message: 'Error Occurred',
            error: result.stderr
          })
        }
      })
      .catch(err=>{
        res.status(500).json({
          status: 1,
          message: 'Error Occurred',
          error: err
        });
      });
  } else if (ext === 'PYTHON' ){
    fs.writeFile('./backend/codingFile/'+filename+'.py', req.body.code, (err)=>{
      if (err)
        console.log(err);
    });
    let resultPromisePython =python.runFile('./backend/codingFile/'+filename+'.py');
    resultPromisePython
      .then(result => {
        console.log(result);
        if (result.stderr === '') {
          res.status(200).json({
            status: 0,
            message: 'Compilation Successful'
          })
        } else {
          res.status(200).json({
            status: 1,
            message: 'Error Occurred',
            error: result.stderr
          })
        }//result object
      })
      .catch(err => {
        res.status(500).json({
          status: 1,
          message: 'Error Occurred',
          error: err
        })
      });
  }
};
exports.onCodeRun = (req, res, next)=>{

};
