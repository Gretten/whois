const whois = require('whois');
const parser = require('parse-whois');
const bodyParser = require('body-parser');
const express = require("express");
const fs = require('fs');

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended:false});
const domainRegExp = /(?<=\/\/)[\w]+?\.[\w.]+/;

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

function getArrayOfLinks(req, res) {
    if(!req.body) return res.sendStatus(400);
    if(!req.body.text) { 
      console.log('nothing to find');
      return;
    };
    let formResult = req.body.text.split('\r\n');
    let parsed = formResult.map(function(item) {
      return item.match(domainRegExp)[0];
    });
    whoisParser(parsed, 'data.txt')
};

app.use(express.static(__dirname + '/form'));
app.post('/input', urlencodedParser, getArrayOfLinks);
app.listen(3000);
