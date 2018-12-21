const User = require('../Models/user'),
      Masrks= require('../Models/marks'),
      RegQuestion= require('../Models/regQuestion'),
      codingQuestion = require('../Models/codingQuestion'),
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
  console.log(req.body);
  const lang = req.body.lang;
  const userId = req.body.userId;
  const codingMarks = 0;
  const codeSuccessStatus =[];
  codingQuestion.findById(req.body.codingQuestionId)
  .then(result =>{
    result.input.forEach(element => {
      let i=0;
      if(lang === 'C'){
        const answer = runCCode(userId, element);
        if(answer == result.output[i]){
          codingMarks+=5;
          codeSuccessStatus.push(1);
        }else {
          codeSuccessStatus.push(0);
        }
      } else if (lang === 'C++') {
        const answer = runCppCode(userId, element);
        if(answer == result.output[i]){
          codingMarks+=5;
          codeSuccessStatus.push(1);
        }else {
          codeSuccessStatus.push(0);
        }
       } else if (lang === 'JAVA') {
        const answer = runJavaCode(userId, element);
        if(answer == result.output[i]){
          codingMarks+=5;
          codeSuccessStatus.push(1);
        }else {
          codeSuccessStatus.push(0);
        }
      } else if (lang === 'PYTHON'){
          const answer =runPythonCode(userId, element);
          if(answer1 == result.output[i]){
            codingMarks+=5;
            codeSuccessStatus.push(1);
          }else {
            codeSuccessStatus.push(0);
          }
        }
      });
      i++;
    })
    Masrks.findOne({user: req.body.userId})
    .then(marks => {
      console.log()
      marks.codingmarks = codingMarks;
      marks.total= marks.questionmarks + marks.codingmarks;
      marks.save();
      res.status(200).json({
        message: 'Code Run Successfully',
        status: codeSuccessStatus
      });
    })
    .catch(err=>{
      res.status(500).json({
        message: 'Can\'t Run The Code'
      });
    })
  })
  .catch(err=>{
    console.log(err);
  })
};

//C code Running Logic
runCCode = (userId, input)=> {
  let resultPromiseC = c.runFile('./backend/codingFile/'+userId+'.py', {stdin: input});
  resultPromiseC.then(result => {
    return result.stdout;
  });
};
//C++ Code Running Logic
runCppCode = (userId, input)=> {
  let resultPromiseCpp = cpp.runFile('./backend/codingFile/'+userId+'.cpp', {stdin: input});
  resultPromiseCpp.then(result => {

  });
};
//Java Code Running Logic
runJavaCode = (userId, input)=> {
  let resultPromiseJava =java.runFile('./backend/codingFile/'+userId+'/Main.java', {stdin: input});
  resultPromiseJava.then(result=>{
    return result.stdout;
  });
};
//Python Code Running Logic
runPythonCode = (userId, input)=> {
  let resultPromisePython =python.runFile('./backend/codingFile/'+userId+'.py', {stdin: input});
  resultPromisePython.then(result=>{
    return result.stdout.substr(0,result.stdout.length-1)
  });
};

