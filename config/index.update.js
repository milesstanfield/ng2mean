var lineReader = require('line-reader');
var exec = require('child_process').exec;

// replace <ng2mean-app> tag with proper app tag
lineReader.eachLine('package.json', function(line) {
  if (line.indexOf('\"name\":') > -1) {
    var dashStyleAppName = line.substring(11).slice(0, -2);
    exec("sed -i -e 's/ng2mean/" + dashStyleAppName +  "/g' ./public/index.html");
  }
});

// replace Ng2meanApp title with proper app title
lineReader.eachLine('src/main.ts', function(line) {
  if (line.indexOf("bootstrap(") > -1) {
    var displayStyleAppName = line.substring(10).slice(0, -11); // i.e Ng2meanApp
    exec("sed -i -e 's/Ng2meanApp/" + displayStyleAppName +  "/g' ./public/index.html");
  }
});
