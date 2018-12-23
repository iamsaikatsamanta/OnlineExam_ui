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
  codingQuestion.findById(req.body.codingQuestionId)
  .then(result =>{
      if (lang === 'C') {
        runCCode(userId, result.input, result.output, res);
      } else if (lang === 'C++') {
        runCppCode(userId, result.input, result.output, res);
      } else if (lang === 'JAVA') {
        runJavaCode(userId, result.input, result.output, res);
      } else if (lang === 'PYTHON') {
        runPythonCode(userId,result.input, result.output, res);
      }
    });

};

//C code Running Logic
runCCode = (userId, input, output , res)=> {
  let marks=0;
  let codingStatus=[];
  let resultPromiseC = c.runFile('./backend/codingFile/'+userId+'.c', {stdin: input[0]});
  resultPromiseC.then(result => {
    const answer0 = result.stdout;
    if (answer0 === output[0]) {
      marks+=5;
      codingStatus.push(0);
    } else {
      codingStatus.push(1);
    }
    c.runFile('./backend/codingFile/'+userId+'.c', {stdin: input[1]})
      .then(result=>{
        const answer1 = result.stdout;
        if (answer1 === output[1]) {
          marks+=5;
          codingStatus.push(0);
        } else {
          codingStatus.push(1);
        }
        calculateMarks(userId,marks);
        res.status(200).json({
          message: 'Code Run Successfully',
          status: codingStatus
        });
      });
  });
};
//C++ Code Running Logic
runCppCode = (userId, input, output, res)=> {
  let marks=0;
  let codingStatus=[];
  let resultPromiseCpp = cpp.runFile('./backend/codingFile/'+userId+'.cpp', {stdin: input});
  resultPromiseCpp.then(result => {
    const answer0 = result.stdout;
    console.log(answer0===output[0]);
    console.log(answer0);
    console.log(output[0]);
    if (answer0 === output[0]) {
      marks+=5;
      codingStatus.push(0);
    } else {
      codingStatus.push(1);
    }
    cpp.runFile('./backend/codingFile/'+userId+'.cpp', {stdin: input[1]})
      .then(result=>{
        const answer1 = result.stdout;
        if (answer1 === output[1]) {
          marks+=5;
          codingStatus.push(0);
        } else {
          codingStatus.push(1);
        }
        calculateMarks(userId,marks);
        res.status(200).json({
          message: 'Code Run Successfully',
          status: codingStatus
        });
      });
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
runPythonCode = (userId, input, output, res)=> {
  let marks=0;
  let codingStatus=[];
  python.runFile('./backend/codingFile/'+userId+'.py', {stdin: input[0]})
    .then(result=>{
      const answer0 = result.stdout.substr(0,result.stdout.length-2);
      if (answer0 === output[0]) {
        marks+=5;
        codingStatus.push(0);
      } else {
        codingStatus.push(1);
      }
      python.runFile('./backend/codingFile/'+userId+'.py', {stdin: input[1]})
        .then(result=>{
          const answer1 = result.stdout.substr(0,result.stdout.length-2);
          if (answer1 === output[1]) {
            marks+=5;
            codingStatus.push(0);
          } else {
            codingStatus.push(1);
          }
          calculateMarks(userId,marks);
          res.status(200).json({
                message: 'Code Run Successfully',
                status: codingStatus
              });
        });
    });
};
calculateMarks = (userId, mark)=>{
  Masrks.findOne({user: userId})
  .then(marks => {
    console.log(marks);
    marks.codingmarks = mark;
    marks.total= marks.questionmarks + marks.codingmarks;
    marks.save();
  })
  .catch(err=>{
    res.status(500).json({
      message: 'Can\'t Run The Code'
    });
  })
};
