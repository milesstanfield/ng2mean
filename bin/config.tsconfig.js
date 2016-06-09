var fs = require('fs');
var exec = require('child_process').execSync;
var file = 'src/tsconfig.json';
var fileString = fs.readFileSync(file).toString();
var oldLines = fileString.match(/(\s+["']files['"]:\s[\[\]a-zA-Z\d\n\s\S]*])/)[1];
var newLines = `

  "filesGlob": [
    "app/**/*.ts",
    "app/*.ts"
  ],
  "files": [
    "main.ts",
    "../typings/browser.d.ts",
    "../node_modules/zone.js/dist/zone.js.d.ts"
  ],
  "exclude": [
    "../node_modules",
    "../typings/main.d.ts",
    "../typings/main"
  ],
  "atom": {
    "rewriteTsconfig": false
  }`;

fileString = fileString.replace(oldLines, newLines);

exec("rm " + file && " touch " + file);
exec("echo " + JSON.stringify(fileString) + " > " + file);
