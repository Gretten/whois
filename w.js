const whois = require('whois-json');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const domainRegExp = /(?<=\/\/)[\w_-]+?\.[\w.]+/;

async function getWhois(arg, file){
	let results = await whois(arg);
	console.log(typeof JSON.stringify(results, null, 2));
}

function getArrayOfLinks(req, res) {
    if (!req.body) return res.sendStatus(400);
    if (!req.body.text) {
        console.log('nothing to find');
        return;
    };
    let formResult = req.body.text.split('\r\n');
    let parsed = formResult.map(function(item) {
        return item.match(domainRegExp)[0];
	});
	for(key of parsed) {
		getWhois(key)
	}
};

app.use(express.static(__dirname + '/form'));
app.post('/input', urlencodedParser, getArrayOfLinks);
app.listen(3000);