const path =require('path'),
    express=require('express'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser');

const adminAuthRoutes = require('./routs/adminAuth'),
      userAuthRoutes = require('./routs/userAuth'),
      adminQuestionRoutes = require('./routs/adminquestion'),
      adminOtherRouter = require('./routs/adminother'),
      userQuestionRouter = require('./routs/userQuestion');
const app=express();
try{
  mongoose.connect('mongodb://ss033:rbkvasqw12@ds115094.mlab.com:15094/onlineexam');
}catch{
  console.log("Can't Connect To DataBase");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images',express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/adminAuth",adminAuthRoutes);
app.use("/api/userAuth", userAuthRoutes);
app.use("/api/admin",adminQuestionRoutes);
app.use("/api/admin",adminOtherRouter);
app.use("/api/user/getquestion", userQuestionRouter);
module.exports = app;
