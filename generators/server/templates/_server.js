
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const faker = require('faker');

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", " GET, PUT, POST, DELETE");
  next();
});

<% entities.forEach(function (entity) { -%>
var <%= entity.pluralizeUncapitalize %> = [
    <%for (var i = 0 ; i < amount; i++) { %>
    { 
<% Object.keys(entity.entity).forEach(function(field) { -%>
<% if(entity.entity[field].key) { -%>
      <%= entity.key %>: guidGenerator(), 
<% } else { -%>
<% if(entity.entity[field].referent) { -%>
      <%= field %>: <%= entity.relations[field][0].pluralizeUncapitalize %>[<%= i %>].<%= entity.relations[field][0].key %>,
<%} else { -%>
      <%= field %>: faker.random.words,
<% } -%> 
<% } -%>
<% }) -%>
    },
<% }%>
];

app.get('/api/<%= entity.pluralizeUncapitalize %>', function (req, res) {  
  res.json({data: <%= entity.pluralizeUncapitalize %>})
})

app.get('/api/<%= entity.pluralizeUncapitalize %>/:id', function (req, res) {    
  res.json({data: <%= entity.pluralizeUncapitalize %>.find((e) => e.<%= entity.key %> === req.params.id)})
})

app.post('/api/<%= entity.pluralizeUncapitalize %>', function (req, res) {  
  var <%= entity.singularUncapitalize %> = req.body;
  <%= entity.singularUncapitalize %>.<%= entity.key %> = guidGenerator();
  <%= entity.pluralizeUncapitalize %>.push(<%= entity.singularUncapitalize %>);

  res.json(<%= entity.singularUncapitalize %>)
})

app.put('/api/<%= entity.singularUncapitalize %>/:id', function (req, res) {   
  var doctor = <%= entity.singularUncapitalize %>.find((e) => e.<%= entity.key %> === req.params.id);
<% Object.keys(entity.entity).forEach(function(field) { -%>
<% if(!entity.entity[field].key) { -%>
  <%= entity.singularUncapitalize %>.<%= field %> = req.body.<%= field %>;
<% } -%>
<% }) -%>
  res.json(<%= entity.singularUncapitalize %>);
})

app.delete('/api/<%= entity.singularUncapitalize %>/:id', function (req, res) {  
  <%= entity.singularUncapitalize %> = <%= entity.singularUncapitalize %>.filter((e) => e.<%= entity.key %> !== req.params.id); 

  res.json({id: req.params.id})
})
<% }) -%>


app.listen(<%= port %>, function () {
  console.log('Example app listening on port <%= port %>!')
})