
const fs = require('fs');
const nltPerson = {};
const nltActor = {};
const gametag = process.argv[2];
const dev = 'win';
const output = `./${tag}VOICE${dev}.js`;
    const proglist = fs.readFileSync(, {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n')
