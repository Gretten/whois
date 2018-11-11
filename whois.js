const whois = require('whois');
const parser = require('parse-whois');
const fs = require('fs');

let arrayOfLinks = [
    'tutknow.ru',
    'overview-sales.ru',
    'tovary-obzor.ru',
    'proguarchibaofatcaps.ru',
    '24tsena.ru',
    'mail.ru'
];

function whoisParser(arr) {
  for (key of arr) {
    whois.lookup(key, (err, data) => {
      if (err) {
        console.log(err);
      }
      let parsed = parser.parseWhoIsData(data);
      for (key of parsed) {
        if (key.value) {
            fs.appendFileSync('file.txt', `\r\n${key.value}`)
        }
      }
    });
  }
}

whoisParser(arrayOfLinks);

// node whois.js