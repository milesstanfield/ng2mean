var fs = require('fs');
var exec = require('child_process').execSync;
var filepath = 'config/db.js';
var nameFileString = fs.readFileSync('src/main.ts').toString();
var displayStyleAppName = nameFileString.match(/bootstrap\((.*)AppComponent\)/)[1];

var sed = "sed -i '' \"s|ng2mean|" + displayStyleAppName + "|g\" " + filepath;
exec(sed);
