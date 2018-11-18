const whois = require('whois');
const parser = require('parse-whois');
const bodyParser = require('body-parser');
const express = require("express");
const fs = require('fs');

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(express.static(__dirname + '/form'));

app.post('/input', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  console.log(req.body);
});


app.listen(3000);

let arrayOfLinks = [];

function whoisParser(arr, file) {
  for (key of arr) {
    whois.lookup(key, (err, data) => {
      if (err) {
        console.log(err);
      }
      let parsed = parser.parseWhoIsData(data);
      for (key of parsed) {
        if (key.value) {
            fs.appendFileSync(file, `\r\n${key.value}`)
        }
      }
    });
  }
}

whoisParser(arrayOfLinks, 'data.txt');