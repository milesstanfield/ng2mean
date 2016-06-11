var fs = require('fs');
var exec = require('child_process').execSync;
var file = 'package.json';
var fileString = fs.readFileSync(file).toString();
var regex = /(\s+['"]scripts['"][^}]+},)/;
var oldLines = fileString.match(regex)[1];
var newLines = fs.readFileSync('ng2mean.package.json').toString().match(regex)[1];
fileString = fileString.replace(oldLines, (newLines));

exec("rm " + file && " touch " + file);
exec("echo " + JSON.stringify(fileString) + " > " + file);
