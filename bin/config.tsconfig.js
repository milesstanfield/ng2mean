var fs = require('fs');
var exec = require('child_process').execSync;
var file = 'src/tsconfig.json';
var fileString = fs.readFileSync(file).toString();
var oldLines = fileString.match(/(\s+["']files['"]:\s[\[\]a-zA-Z\d\n\s\S]*])/)[1];
var newLines = fs.readFileSync('ng2mean.tsconfig.json').toString().match(/(\s\s['"]filesGlob[^}]+})/)[1];
fileString = fileString.replace(oldLines, ('\n\n' + newLines));

exec("rm " + file && " touch " + file);
exec("echo " + JSON.stringify(fileString) + " > " + file);
