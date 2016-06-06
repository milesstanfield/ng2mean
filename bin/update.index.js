var fs = require('fs');
var path = require('path');
var exec = require('child_process').execSync;
var filepath = path.resolve(__dirname + '/public/index.html');

// replace <ng2mean-app> tag with proper app tag
var fileString = fs.readFileSync(path.resolve(__dirname + '/package.json')).toString();
var dashStyleAppName = fileString.match(/name['"]: ['"](.*)\"/)[1];
var sed = "sed -i -e \"s|ng2mean|" + dashStyleAppName + "|g\" " + filepath;
exec(sed);

// replace Ng2meanApp title with proper app title
var fileString = fs.readFileSync(path.resolve(__dirname + '/src/main.ts')).toString();
var displayStyleAppName = fileString.match(/bootstrap\((.*)AppComponent\)/)[1];
var sed = "sed -i -e \"s|Ng2meanApp|" + displayStyleAppName + "|g\" " + filepath;
exec(sed);

// remove the generated sed file
exec("rm " + filepath + "-e");
