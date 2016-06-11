var fs = require('fs');
var exec = require('child_process').execSync;
var filepath = 'public/index.html';

// replace <ng2mean-app> tag with proper app tag
var fileString = fs.readFileSync('package.json').toString();
var dashStyleAppName = fileString.match(/name['"]: ['"](.*)\"/)[1];
var sed = "sed -i '' \"s|ng2mean|" + dashStyleAppName + "|g\" " + filepath;
exec(sed);

// replace Ng2meanApp title with proper app title
var fileString = fs.readFileSync('src/main.ts').toString();
var displayStyleAppName = fileString.match(/bootstrap\((.*)AppComponent\)/)[1];
var sed = "sed -i '' \"s|Ng2meanApp|" + displayStyleAppName + "|g\" " + filepath;
exec(sed);
