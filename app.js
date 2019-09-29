
//External Files/Libs
var moment = require('moment');

//Express Params
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));
app.set('port', process.env.PORT || 7879);

//Mongo Params
var mongoose = require('mongoose');
mongoURL = 'mongodb+srv://jyothi:1234@cluster0-hygoz.mongodb.net/test?retryWrites=true&w=majority';

//Models
var student = require('./models/student');

//Mongo DB connect
mongoose.connect(mongoURL, { useNewUrlParser: true }, function (err, connect) {
  if (err) {
    console.log("Mongodb not Connected");
  } else {
    console.log("Mongodb Connected");

  }
});

app.post('/studentRequest', function (req, res) {
  var resstudentRequest={};
  var name = req.body.name;
  var rollno = req.body.rollno;
  var phonenumber = req.body.phonenumber;
  var mark = req.body.mark;
  saveDataInMongo(name, rollno, phonenumber,mark);
  resstudentRequest.status='success';
  res.json(resstudentRequest);
});


app.post('/student', function (req, res) {
  var resstudent={};
  var studentQuery = student.find({
  })
  studentQuery.exec().then(res2 => {
    resstudent.status='success';
    resstudent.logs=res2;
    res.json(resstudent);
  })
    .catch(err => {
      console.log("Error in Fetch Student Logs" + err);
      resstudent.status=err;
      res.json(resstudent)
    })
});

app.post('/studentSpecificLog', function (req, res) {
  var rollno=req.body.rollno;
  var resstudent={};
  var studentQuery = student.findOne({
    rollno:rollno
  })
  studentQuery.exec().then(res2 => {
    if(res2==null){
      resstudent.status='No Record Found';
      resstudent.logs=res2;
      res.json(resstudent);
    }
    else{
      resstudent.status='success';
      resstudent.logs=res2;
      res.json(resstudent);
    }

  })
    .catch(err => {
      console.log("Error in Fetch student Logs" + err);
      resstudent.status=err;
      res.json(resstudent)
    })
});

function saveDataInMongo(name, rollno,phonenumber,mark) {
  var studentObj = new student({
    name: name,
    rollno: rollno,
    phonenumber: phonenumber,
    mark : mark
  });
  studentObj.save(function (error) {
    if (error) {
      console.error("Error in Saving Data->" + error);
    }
    else {
      console.log("Successfully saved data");
    }
  })
}


app.listen(app.get('port'));