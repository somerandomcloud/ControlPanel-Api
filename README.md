# ControlPanel-Api
ControlPanel-Api is an api wrapper for the custom billing software called ControlPanel. This wrapper makes it easier to interact with the API included with the software. 

![](https://img.shields.io/npm/l/controlpanel-api)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
![npm](https://img.shields.io/npm/dt/controlpanel-api?style=for-the-badge)

## Installation
Current release: 1.3.0

`$ npm install controlpanel-api`
`$ yarn add controlpanel-api`
## Loading and configuring package
```js
const control = require('controlpanel-api');

control.setOptions('http://127.0.0.1', 'jaiEBGZbIOlGfS-ExaMpLeQB5vgv7eQxFv6TWEPZ-Gw6BD3n');
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

## Users

getUsers()

Get all available users

---
getUserData(id)

Get a users data from the panel DB

id: The ID of the user. Can be their panel id or their discord account id

---

editUserCredits(id, newNumber)

Give a user a new balance. Will remove the old balance and change it with the number defined.

id: The ID of the user.

newNumber: The new number of credits for the users balance.

---
 
addUserCredits(id, addXCredits)

Add to a users existing balance the defined credits.

id: The ID of the user.

addXCredits: The number of credits to add.

---

removeUserCredits(id, removeXCredits)

Removes from a users existing balance the defined credits.

id: The ID of the user.

removeXCredits: The number of credits to remove.

---

editUserName(id, newName)

Edits a users ControlPanel name. 

id: The ID of the user.

newName: The new name for the users account.

---

editUserRole(id, newRole)

Edits the users role. Has to be one of these: 'admin', 'mod', 'client', 'member'

id: The ID of the user.

newRole: The new role for the users account.

---

deleteUser(id)

Delete a user from the panel DB

id: The ID of the user.

## Servers

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

## Vouchers

listVouchers()

Lists all available vouchers.

---

getVoucherData(id)

Get a vouchers data

id: The ID of the voucher

---

createVoucher(code, uses, credits, expires)

Create a voucher with a specified code, how many uses it has, how many credits it redeems, and its expire date

code: The code that needs to be used to use the voucher. Obligatory. (EX: SUMMER)

uses: How many uses the voucher has. Obligatory. (EX: 10) (MAX: 2147483647)

credits: How many credits the voucher has. Obligatory. (EX: 250) (MAX: 99999999)

expires: The date the voucher expires. Can be null, aka never. (EX: 26-09-2023)

---

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Contributers

[ICodeInAssembly] (https://github.com/somerandomcloud)
[DragonizedPizza] (https://github.com/Dragonizedpizza)

## License
[MIT](https://choosealicense.com/licenses/mit/)

![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)
