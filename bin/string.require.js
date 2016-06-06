/*
  WHAT THIS SCRIPT DOES: replaces angular2 decorators that use local urls with string versions of the file
  https://github.com/AngularClass/angular2-webpack-starter/issues/126#issuecomment-154856364

  HOW TO USE
  node bin/string.require.js <path-to-your-component-file>
*/

var fs = require('fs');
var exec = require('child_process').execSync;
var file = process.argv.slice(2)[0];
var fileString = fs.readFileSync(file).toString();
var assetPaths = fileString.match(/(['"])(.*?.html|.*?.css|.*?.pug|.*?.jade|.*?.scss)(['"])/g);

// replace 'asset_paths' with require('to-string!./asset_paths')
if (assetPaths) {
  for (i = 0; i < assetPaths.length; i++) {
    var pathWithRequire = "require('to-string!./" + assetPaths[i].substring(1) + ')';
    var sed = "sed -i -e \"s|" + assetPaths[i] + "|" + pathWithRequire + "|g\" " + file;
    exec(sed);
  };
};

// replace templateUrl: with template:
exec("sed -i -e \"s|templateUrl|template|g\" " + file);
// remove the generated sed file
exec("rm " + (file + '-e'));
