![](https://img.shields.io/npm/l/controlpanel-api)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![Support Server](https://img.shields.io/discord/591914197219016707.svg?color=7289da&label=ControlPanel&logo=discord&style=flat-square)](https://discord.gg/Qw69vNzFg6)


# ControlPanel-Api
ControlPanel-Api is an api wrapper for the custom billing software called ControlPanel. This wrapper makes it easier to interact with the API included with the software. 
## Installation
Current release: 0.0.1

`npm install controlpanel-api`
## Loading and configuring package
```js
const control = require('controlpanel-api')

setOptions('http://127.0.0.1', 'jaiEBGZbIOlGfS-ExaMpLeQB5vgv7eQxFv6TWEPZ-Gw6BD3n')
```
To configure the package, you need to add after importing the package the setOptions function to apply your settings. You need your panel domain and your api token.
### How to create an api token
1. Access the panel as admin, and scroll on the sidebar to Application API.
2. Press `Create New` and give it a memo to remember it is your api token
3. Thats it! Remember to NOT share this token!
## Example(s)
Fetching user data and logging in console.
```js
const controlpanel = require('controlpanel-api');

controlpanel.setOptions('http://127.0.0.1:80', 'jaiEBGZbIOlGfS-ExaMpLeQB5vgv7eQxFv6TWEPZ-Gw6BD3n');

controlpanel.getUserData(1).then(res => {
    console.log(res.data);
}).catch(err => {
    console.log(err);
});
```
# Functions
setOptions(url, apiToken)

Set the options for the wrapper to communicate with the API

url: The URI that leads to your panel.

apiToken: The token you get from following `How to create an api token`

---
getUsers()

Get all available users

---
getUserData(id)

Get a users data from the panel DB

id: The ID of the user. Can be their panel id or their discord account id

---

deleteUser(id)

Delete a user from the panel DB

id: The ID of the user.

---

listServers()

Lists all available servers

---

getServerData(id)

Get a servers data from the panels DB

id: The ID of the server. 

---

suspendServer(id) / unsuspendServer(id)

Suspend or unsuspend a server.

id: The ID of the server.

---
deleteServer(id)

Deletes the specified server.

id: The ID of the server

---

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)
