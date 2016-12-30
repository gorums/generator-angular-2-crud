
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var guidGenerator = function() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var doctors = [
    { id: guidGenerator(), name: "Jhon", address: "address1" },
    { id: guidGenerator(), name: "Robert", address: "address2" },
    { id: guidGenerator(), name: "Grate", address: "address3" }
];

var users = [
    { id: guidGenerator(), name: "JhonClient", address: "address1", contactNo: "contactNo1", doctorId: doctors[0].id },
    { id: guidGenerator(), name: "JhonClient1", address: "address2", contactNo: "contactNo2", doctorId: doctors[1].id },
    { id: guidGenerator(), name: "JhonClient2", address: "address3", contactNo: "contactNo3", doctorId: doctors[0].id },
    { id: guidGenerator(), name: "JhonClient3", address: "address4", contactNo: "contactNo4", doctorId: doctors[2].id }
];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", " GET, PATCH, POST, DELETE");
  next();
});

app.get('/api/doctors', function (req, res) {  
  res.json({data: doctors})
})

app.get('/api/doctors/:id', function (req, res) {    
  res.json({data: doctors.find((d) => d.id === req.params.id)})
})

app.post('/api/doctors', function (req, res) {  
  var doctor = req.body;
  doctor.id = guidGenerator();
  doctors.push(doctor);

  res.json(doctor)
})

app.patch('/api/doctors/:id', function (req, res) {   
  var doctor = doctors.find((d) => d.id === req.params.id);
  doctor.name = req.body.name;
  doctor.address = req.body.address;

  res.json(doctor);
})

app.delete('/api/doctors/:id', function (req, res) {  
  doctors = doctors.filter((d) => d.id !== req.params.id); 

  res.json({id: req.params.id})
})

app.get('/api/users', function (req, res) {  
  res.json({data: users})
})


app.get('/api/users/:id', function (req, res) {  
  res.json({data: users.find((u) => u.id === req.params.id)})
})


app.post('/api/users', function (req, res) {  
  var user = req.body;
  user.id = guidGenerator();
  users.push(user);

  res.json(user)
})


app.patch('/api/users/:id', function (req, res) {  
  var user = users.find((u) => u.id === req.params.id);
  user.name = req.body.name;
  user.address = req.body.address;
  user.doctorId = req.body.doctorId;

  res.json(user);
})


app.delete('/api/users/:id', function (req, res) {  
  users = users.filter((u) => u.id !== req.params.id); 

  res.json({id: req.params.id})
})

app.listen(3500, function () {
  console.log('Example app listening on port 3500!')
})

