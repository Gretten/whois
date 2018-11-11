const whois = require('whois');
const parser = require('parse-whois');
const fs = require('fs');

let arrayOfLinks = [
    'javascript.ru'
];

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