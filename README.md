# Introduction
The following provides documentation on how to setup a production ready MEAN app with Angular2 on Heroku<br><br>
- written in Typescript
- bootstrapped with angular-cli
- bundled with Webpack
- hosted on Heroku
- Node.js backend server
- MongoDB + Mongoose
- Express.js web framework

*Note:*
Angular2 and AngularCLI are in a state of flux atm. The following is confirmed to work as of
*June5 2016*
---

# Install global dependencies
```
brew update
brew install node mongodb heroku
npm install -g angular-cli typescript
```


# Bootstrap your angular app with
``ng new <your-app-name> && cd <your-app-name>``


# Install app dependencies
``npm install express method-override mongoose body-parser --save``


# Install dev dependencies
``npm install babel-core babel-loader babel-preset-es2015 compression-webpack-plugin rimraf ts-helpers ts-loader webpack raw-loader json-loader to-string-loader --save-dev``


# Move assets into public folder
```
mv src/favicon.ico public/
```


# Create new index.html file in public folder
MILES write something to replace the default ng2mean tag and title here
```
rm src/index.html
curl -o ./public/index.html https://raw.githubusercontent.com/milesstanfield/ng2mean/master/public/index.html
```


# Create Webpack related files
```
curl -o ./webpack.config.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/webpack.config.js
curl -o ./src/vendor.ts https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/vendor.ts
curl -o ./src/polyfills.ts https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/polyfills.ts
```


# Configure tsconfig.json file
in ``src/tsconfig.json`` replace "files" with
```
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
}
```


# Reconfigure typings.json file
```
rm typings.json && typings init
typings install dt~node dt~core-js --global --save
sed -i -e 's/global/ambient/g' ./typings.json
rm typings.json-e
```



# Configure package.json scripts
```
"scripts": {
  "start": "webpack-dev-server --inline --progress --colors --watch --display-error-details --display-cached --hot --port 8080",
  "build": "npm run clean && webpack",
  "clean": "rimraf dist typings && typings install",
  "lint": "tslint \"src/**/*.ts\"",
  "postinstall": "npm run clean",
  "pree2e": "webdriver-manager update",
  "test": "ng test",
  "e2e": "protractor"
},
```


# Convert css/html files loaded in component to string
**example:** within ``src/app/ng2mean.component.ts`` I replaced
```
@Component({
  moduleId: module.id,
  selector: 'ng2mean-app',
  templateUrl: 'ng2mean.component.html',
  styleUrls: ['ng2mean.component.css']
})
```
with this
```
@Component({
  moduleId: module.id,
  selector: 'ng2mean-app',
  template: require('to-string!./ng2mean.component.html'),
  styleUrls: [require('to-string!./ng2mean.component.css')]
})
```
[reference](https://github.com/AngularClass/angular2-webpack-starter/issues/126#issuecomment-154856364)


# Ensure all dependencies are installed and scripts set
```
npm install
```


# Create and start MongoDB server
```
sudo mkdir -p /data/db
sudo chown <YOUR_MAC_USERNAME> /data/db
mongod
```
**hint:** you can find your mac username quickly with ``ls -la`` and you can interact with mongo shell (for debugging/dev) by running ``mongo --shell`` in another tab


# Setup routes, express and db
MILES update db.js with name of app
```
mkdir -p src/app/models src/app/routes/api
curl -o ./server.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/server.js
curl -o ./src/app/models/kitten.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/app/models/kitten.js
curl -o src/app/routes/api/kittens.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/app/routes/kittens.js
curl -o config/db.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/config/db.js
```


# Create Procfile
```
touch Procfile && echo "web: node server.js" > Procfile
```


# Bundle files
```
npm run build
```


# Start dev server
```
npm run start
```


# Start prod server
**make sure mongodb is running in a termnial tab first**
```
 node server.js
```



# Deploying to Heroku
Create a heroku repo
```
heroku create
```
Push your code to Heroku
```
git push heroku master
```
Ensure at least 1 free dyno is running
```
heroku ps:scale web=1
```
install a sandbox mongodb
```
heroku addons:create mongolab:sandbox
```
Tail the heroku logs and restart the server.
```
heroku logs -t
heroku restart
```
If server is setup correctly you will see "Magic happening on your site" in your logs. You can now open the app in browser from command line
```
heroku open
```

# Notes
You can view this app on Heroku [here](https://blooming-spire-73058.herokuapp.com/)
