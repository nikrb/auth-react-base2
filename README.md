
create a boilerplate for react dev.

Architecture updated and passport tidied and trimmed down from [latest project](https://github.com/chingu-voyage3/bears-21).

* node.js
* react.js
* react-router-dom (react-router v4)
* mongodb & mongoose
* passport.js (passport-local)
* redux
* unit testing
* image upload (for user profile)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# setup

Install Node (version 8) and mongo.

#### install mongo
unixy:
`sudo apt-get install mongodb-org`

## development
1. clone repo
2. create .env file, cf. .env.example
2. npm install
```
cd frontend
npm install
cd ..
npm install
```
3. startup mongo (`mongod`)
4. npm run develop

## production (e.g. for cloud9)
1. clone repo
2. create .env file (cf .env.example)
3. npm install (same as development above)
4. build production
```
cd client
npm run build
cd ..
```
6. start mongo
7. run server `node server`

## Deploy to Heroku (production)

Create a new mongodb on mLab and clone project.

```
git clone https://github.com/nikrb/auth-redux-react-base.git
cd auth-redux-react-base/
heroku create
git push heroku master
```

After creating the heroku app (```heroku create```) setup the environment using
the heroku dashboard. Don't set PORT.

`heroku create` creates a random name for the heroku app, so it's better to use
heroku dashboard to create the app, then set the git remote manually, in place
of the heroku create above.
```
git remote rm heroku
heroku git:remote -a newname
```
