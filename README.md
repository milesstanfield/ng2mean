# Introduction
A 5min copy&paste guide to setting up a production ready MEAN web-app with Angular2 on Heroku <br><br>
- Written in Typescript
- Bootstrapped with angular-cli
- Bundled with Webpack
- Hosted on Heroku
- Node.js backend server
- MongoDB + Mongoose
- Express.js web framework

**Note:** Angular2 and AngularCLI are in a state of flux atm. The following is confirmed to work with ``angular-cli@1.0.0-beta.5`` as of **June12 2016**

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


# Configure index.html file
This will remove current cli-generated index.html and download a new one in the public folder
```
rm src/index.html
curl -o public/index.html https://raw.githubusercontent.com/milesstanfield/ng2mean/master/public/index.html
```
This will download & execute script to automatically format the new index.html based upon your app name and specifications. Then it will remove the script.
```
curl -o config.index.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/bin/config.index.js
node config.index.js && rm config.index.js
```


# Download Webpack related files
```
curl -o ./webpack.config.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/webpack.config.js
curl -o ./src/vendor.ts https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/vendor.ts
curl -o ./src/polyfills.ts https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/polyfills.ts
```


# Configure tsconfig.json file
This will download & execute files to automatically edit your tsconfig.json file. Then it will remove the downloaded files.
```
curl -o config.tsconfig.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/bin/config.tsconfig.js
curl -o ng2mean.tsconfig.json https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/tsconfig.json
node config.tsconfig.js && rm config.tsconfig.js ng2mean.tsconfig.json
```


# Configure typings.json file
```
rm typings.json && typings init
typings install dt~node dt~core-js --global --save
sed -i -e 's/global/ambient/g' ./typings.json
rm typings.json-e
```


# Configure package scripts
This will download & execute files to automatically edit your package.json file. Then it will remove the downloaded files.
```
curl -o config.package.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/bin/config.package.js
curl -o ng2mean.package.json https://raw.githubusercontent.com/milesstanfield/ng2mean/master/package.json
node config.package.js && rm config.package.js ng2mean.package.json
```


# Convert component loaded assets to string
This will download and execute a script to convert loaded assets in \*\*.component.ts files to string. Why? read [this](https://github.com/AngularClass/angular2-webpack-starter/issues/126#issuecomment-154856364)
```
mkdir bin
curl -o bin/string.require.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/bin/string.require.js
node bin/string.require.js
```


# Ensure dependencies are installed and scripts set
```
npm install
```


# Setup routes, express and db
```
mkdir -p src/app/models src/app/routes/api
curl -o ./server.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/server.js
curl -o ./src/app/models/kitten.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/app/models/kitten.js
curl -o src/app/routes/api/kittens.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/src/app/routes/api/kittens.js
curl -o config/db.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/config/db.js
```

This downloads and executes a script to automatically update config/db.js with your app name, then delete the script
```
curl -o config.db.js https://raw.githubusercontent.com/milesstanfield/ng2mean/master/bin/config.db.js
node config.db.js && rm config.db.js
```


# Create Procfile for Heroku
```
touch Procfile && echo "web: node server.js" > Procfile
```


# Bundle your files
```
npm run build
```


# Create and start MongoDB server

**hint:** you can find your mac username quickly with ``ls -la`` and

```
sudo mkdir -p /data/db
sudo chown <YOUR_MAC_USERNAME> /data/db
```
Open up a new tab and start mongodb server
```
mongod
```




# Start server
dev server runs at [http://localhost:3000/](http://localhost:8080/)
```
npm run start
```

**note** there are currently some benign errors when running this ``ERROR in chunk app [entry]`` ignore them. I will investigate these further.

**Optional:** test prod server locally [http://localhost:8080/](http://localhost:3000/)

```
node server.js
```


# Deploying to Heroku
Create a heroku repo
```
heroku create
```
Make sure your changes are committed
```
git init && git add . && git commit -m 'initial commit'
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
Open a new tab and restart the server.
```
heroku restart
```
If server is setup correctly you will see "Magic happening on your site" in your logs. You can now open the app in browser from command line
```
heroku open
```

# Notes
You can view this app on Heroku [here](https://blooming-spire-73058.herokuapp.com/)

You can interact with mongo shell (for debugging/dev) by running ``mongo --shell`` in another tab


# TODOS
- silence some of the benign console erros in dev and also the webpack-dev-server errors
