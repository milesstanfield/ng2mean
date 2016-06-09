# Introduction
The following provides documentation on how to setup a production ready MEAN app with Angular2 on Heroku<br><br>
- written in Typescript
- bootstrapped with angular-cli
- bundled with Webpack
- hosted on Heroku
- Node.js backend server
- MongoDB + Mongoose
- Express.js web framework

**Note:** Angular2 and AngularCLI are in a state of flux atm. The following is confirmed to work as of **June5 2016**

---

# Install global dependencies
```
brew update
brew install node mongodb heroku
npm install -g angular-cli typescript
```


# Bootstrap your angular app with angular-cli
``ng new <your-app-name> && cd <your-app-name>``


# Install app dependencies
``npm install express method-override mongoose body-parser --save``


# Install dev dependencies
``npm install babel-core babel-loader babel-preset-es2015 compression-webpack-plugin rimraf ts-helpers ts-loader webpack raw-loader json-loader to-string-loader --save-dev``


# Move favicon into public folder
```
mkdir public/images && mv src/favicon.ico public/images
```


# Download and configure new index.html file
Remove current cli-generated index.html and download a new one in the public folder
```
rm src/index.html
curl -o public/index.html https://raw.githubusercontent.com/milesstanfield/ng2mean/master/public/index.html
```
Download & execute script to automatically format the new index.html based upon your app name and specifications. Then remove the script.
```
curl -o update.index.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/bin/update.index.js
node update.index.js && rm update.index.js
```


# Download Webpack related files
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


# Configure typings.json file
```
rm typings.json && typings init
typings install dt~node dt~core-js --global --save
sed -i -e 's/global/ambient/g' ./typings.json
rm typings.json-e
```



# Configure package scripts
In ``package.json`` replace content of "scripts" with
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
```
mkdir bin
curl -o bin/string.require.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/bin/string.require.js
node bin/string.require.js src/

find src -name "**component.ts"
```


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

**hint:** you can find your mac username quickly with ``ls -la`` and

**hint:** you can interact with mongo shell (for debugging/dev) by running ``mongo --shell`` in another tab


# Setup routes, express and db
```
mkdir -p src/app/models src/app/routes/api
curl -o ./server.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/server.js
curl -o ./src/app/models/kitten.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/app/models/kitten.js
curl -o src/app/routes/api/kittens.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/app/routes/kittens.js
curl -o config/db.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/config/db.js
```

> **note to author:** write something to update db.js with name of users app


# Create Procfile for Heroku
```
touch Procfile && echo "web: node server.js" > Procfile
```


# Bundle your files
```
npm run build
```


# Start server
dev server runs at [localhost:3000/](localhost:3000/)
```
npm run start
```

**Optional:** test prod server locally [localhost:8080/](localhost:8080/)
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


# TODOS
- silence some of the benign console erros in dev and also the webpack-dev-server errors
