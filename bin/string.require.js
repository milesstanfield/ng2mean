/*
  WHAT THIS SCRIPT DOES: replaces angular2 decorators that use local urls with string versions of the file.
  WHY? -> https://github.com/AngularClass/angular2-webpack-starter/issues/126#issuecomment-154856364

  ---- EXAMPLES ----
  // Format a single file
  node bin/string.require.js <path-to-your-component-file>

  // Format all component files within /src directory
  node bin/string.require.js
*/

var fs = require('fs');
var exec = require('child_process').exec;

var stringRequireFile = function(file) {
  var fileString = fs.readFileSync(file).toString();
  var regex = /["'][^'"]+(?:.css|.html|.pug|.jade|.scss|.haml|.sass)+["'](?!\))/g;
  var assetPaths = fileString.match(regex);

  // replace 'asset_paths' with require('to-string!./asset_paths')
  if (assetPaths) {
    for (i = 0; i < assetPaths.length; i++) {
      var pathWithRequire = "require('to-string!./" + assetPaths[i].substring(1) + ')';
      var sed = "sed -i '' \"s|" + assetPaths[i] + "|" + pathWithRequire + "|g\" " + file;
      exec(sed);
    };
  };

  // replace templateUrl: with template:
  exec("sed -i '' \"s|templateUrl|template|g\" " + file);
};

if (process.argv.length > 2) { // if file argument passed in terminal command
  var file = process.argv.slice(2)[0];
  stringRequireFile(file);
} else { // Format all component files within /src directory
  exec('find src -name **.component.[tj]s', function(err, file, x) {
    stringRequireFile(file.split("\n")[0]);
  });
};
