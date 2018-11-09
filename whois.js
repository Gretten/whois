const whois = require('whois');
const parser = require('parse-whois');

// Выходящий массив ссылок, в дальнейшем может быть строка
let arrayOfLinks = [
    'google.com',
    'yandex.ru'
];

// Обрабатывает пропарсенный массив - ищет value и выводит в консоль. 
const dataHandler = (err, data) => {
    if (err) {
        console.log(err);
    } else {
        let parsedData = parser.parseWhoIsData(data);
        console.log(
            parsedData.map(item => {
                return item.value;
            })
        );
    };
};

// Делит массив ссылок на отдельные элементы и применяет к ним функцию dataHandler
const mulDomains = inputArray => {
    return inputArray.map(item => {
        return whois.lookup(item, dataHandler)
    });
};

mulDomains(arrayOfLinks);


// node whois.js