# Chatroom

A messenger app that allows you to add friends and chat with them. Built with the MERN stack using FeathersJS.

## Technologies and Frameworks
- Front-end:
  - ReactJS
  - MaterialUI (and some Bootstrap)
  - Redux
  - FeathersJS client
  - Jest and Enzyme for testing
- Back-end:
  - NodeJS run-time for the server
  - FeathersJS configured with ExpressJS
  - MongoDB and Mongoose for the database
  
## Screenshots
**1. The login page.**

<img src="https://github.com/gandh99/Chatroom/blob/master/screenshots/login.png" alt="alt text" width="100%" height="50%">

**2. Start by adding a friend.**

<img src="https://github.com/gandh99/Chatroom/blob/master/screenshots/add_friend.png" alt="alt text" width="100%" height="50%">

**3. The friend will then show up on your friends page.**

<img src="https://github.com/gandh99/Chatroom/blob/master/screenshots/friends_page.png" alt="alt text" width="100%" height="50%">

**4. Start a new chatgroup with 1 or more friends.**

<img src="https://github.com/gandh99/Chatroom/blob/master/screenshots/new_chatgroup.png" alt="alt text" width="100%" height="50%">

**5. Start by typing something to your friend and chatting with that in real-time.**

<img src="https://github.com/gandh99/Chatroom/blob/master/screenshots/new_chat.png" alt="alt text" width="100%" height="50%">
<img src="https://github.com/gandh99/Chatroom/blob/master/screenshots/chat.png" alt="alt text" width="100%" height="50%">

**6. View a list of your chatgroups, sorted in real-time by the latest messages received.**

<img src="https://github.com/gandh99/Chatroom/blob/master/screenshots/all_chatgroups.png" alt="alt text" width="100%" height="50%">


## Notes on Deployment
There are a few characteristics of this project that are different from typical full-stack JS projects. This affects how it must be configured in order for it to be deployed onto Heroku. These characteristics are:

1. This project is built using the MERN (MongoDB, ExpressJS, React, NodeJS) stack.
2. The Node backend uses the FeathersJS framework.
3. The server entry point (app.js/index.js/etc.) is not located in the root directory. In fact, the root directory contains separate client/ and server/ folders.
4. MongoDB Atlas was used to host the MongoDB database.

Therefore, in order to correctly deploy this project, the following steps had to be taken:

1. The root directory must have a package.json file. 
    - This package.json file should have a "start" script which can allow Heroku to start the main server file. 
	- The "start" script must call npm install in the server.
	- Alternatively, one could also use a Heroku Procfile located in the root directory to perform the same function. 
2. Delete `app.use('/', express.static(app.get('public')))` and `app.use(favicon(path.join(app.get('public'), 'favicon.ico')))` from the app.js file in the FeathersJS framework.
    - They are not needed because we are not serving our website from Feathers' public/ folder.
3. Include `process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '../config/')` in app.js.
    - This tells Heroku where to look for the config/ folder, relative to the app.js location.
    - It is important to have the '../' in the '../config/' path name.
4. Include `app.use(express.static(path.join(__dirname, '../../client/build')))` and
```
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../client/build/index.html'))
})
``` 
at the end of the app.js file. This tells Heroku where to look for the entry point in the React app, which is located in the client/ folder (at the same level as server/).

5. Either move `app.use(express.notFound())` all the way to very end of app.js, or remove it entirely.
    - This is because leaving it in its original place would cause the Heroku app to always server the default Feathers' 404 Not Found page.
6. Ensure that the contents of the config/ folder are pushed to Git and Heroku.
    - Be extra careful not to include any sensitive information like passwords and keys.
    - All sensitive information should be set in Heroku's settings, under the config variables.
    - The values in the .json file can refer to the config variables directly by name, and they must be enclosed in double quotes.
7. Make sure that the correct values for `host`, `port`, `mongodb`, etc. are assigned in the production.json file.
8. In MongoDB Atlas, make sure to whitelist `0.0.0.0/0` so that the Heroku app can connect to it.

References:
- [How to setup Heroku when your server entry point is in a sub-folder.](https://stackoverflow.com/a/61354113)
- [Configuring the production.json file, and teaching app.js how to find it.](https://docs.feathersjs.com/api/configuration.html#usage)

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications. For more information on Feathers you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
