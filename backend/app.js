const express=require('express'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser');
var app=express();
try{
  mongoose.connect('mongodb+srv://SS:rbkvasqw@cluster0-9xjs0.mongodb.net/test?retryWrites=true');
}catch{
  console.log("Can't Connect To DataBase");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


module.exports = app;