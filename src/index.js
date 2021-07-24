const axios = require('axios');
const validUrl = require('valid-url');
let apiToken, url, options;

function delLast(str) {
	return str.splice(0, -1);
}
/**
 * @description Sets the options for the api wrapper
 * @param {url} URL URL to the panel
 * @param {apiToken} API API token from api page
 * @returns
 */

const setOptions = (URL, APIToken) => {

	if (!validUrl.isUri(url)) throw new Error("Invalid URL isn't a valid URI. Example of valid URI: https://google.com | Invalid URI: google.com");
	apiToken = APIToken;
	url = URL.endsWith("/") ? delLast(url) : url;

	options = {
		method: 'GET',
		url: url,
		headers: {
			'authorization': `Bearer ${apiToken}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
	};
};

/**
 * Returns user data.
 * @returns {Object}
 */
const getUsers = () => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${options.url}/api/users`;
		const data = await axios(opt).catch((e) => reject(e));
		resolve(data.data);
	});
};

/**
 * Get a specified user's data.
 * @param {String | Number} id User ID.
 * @returns {Object}
 */

const getUserData = (id) => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${opt.url}/api/users/${id}`;
		const data = axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * Edit a user's name.
 * @param {String | Number} id The user's ID.
 * @param {String} newName The user's new name.
 * @returns 
 */

const editUserName = (id, newName) => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${options.url}/api/users/${id}`;
		opt.method = 'PATCH';
		options.data = { 'name': newName };
		if (!newName) reject('Invalid name provided.');
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * Edits a user's credits.
 * @param {String | Number} id The user's ID.
 * @param {String | Number} newNumber The user's new name.
 * @returns 
 */

const editUserCredits = (id, newNumber) => {
	return new Promise(async (resolve, reject) => {
		options.url = `${options.url}/api/users/${id}`;
		options.method = 'PATCH';
		if (!newNumber) reject("Invalid number provided.");
		if (isNaN(newNumber)) reject("Number provided ");
		options['data'] = { 'credits': newNumber };
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * Edits a user's role.
 * @param {String | Number} id The user's ID.
 * @param {*} newRole The user's new role.
 * @returns 
 */

const editUserRole = (id, newRole) => {
	return new Promise(async (resolve, reject) => {
		const validRoles = ["admin", "mod", "client", "member"];
		if (!validRoles.includes(newRole)) reject(`Invalid role provided. Valid roles: ${validRoles.map(r => `'${r}'`).join(", ")}`);

		const opt = options;
		opt.url = `${options.url}api/users/` + id;
		opt.method = 'PATCH';
		opt.data = { 'role': newRole };
		
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * Deletes a specific user.
 * @param {String | Number} id The user's ID.
 * @returns {Object}
 */

const deleteUser = (id) => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${options.url}/api/users/` + id;
		opt.method = 'DELETE';
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * Add credits to a specific user.
 * @param {String | Number} id The user's ID.
 * @param {String | Number} addXCredits Amount of credits to be added.
 * @returns {Object}
 */

const addUserCredits = (id, addXCredits) => {
	return new Promise(async (resolve, reject) => {
		const user = await getUserData(id).catch(e => reject(e));
		const opt = options;	
		opt.method = 'PATCH';

	    if (!newNumber) return console.log('Invalid amount of credits to be added.');
		if (isNaN(newNumber)) reject('Amount of credits to be added is not a number.');
		
		opt.data = { 'credits': user.data.credits + newNumber };
		const data = await axios(opt).catch(r => reject(r));
		resolve(data.data);
	});
};

/**
 * Remove credits from a specific user.
 * @param {String | Number} id The user's ID.
 * @param {String | Number} removeXCredits Amount of credits to be removed.
 * @returns {Object}
 */

const removeUserCredits = (id, removeXCredits) => {
	return new Promise(async (resolve, reject) => {
		const user = await getUserData(id).catch(e => reject(e));
		const opt = options;
		opt.method = 'PATCH';
		
		if (!removeXCredits) reject('Invalid amount to remove.');
		if (isNaN(removeXCredits)) reject('Amount is not a number.');
		
		opt.data = { 'credits': user.data.credits - removeXCredits };
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * List all servers.
 * @returns
 */

const listServers = () => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${opt.url}/api/servers`;
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * Get a specific server's data.
 * @param {String | Number} id The server's ID.
 */

const getServerData = (id) => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${options.url}/api/servers/${id}`;
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * Suspend a server.
 * @param {String | Number} id The server's ID.
 * @returns 
 */

const suspendServer = (id) => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${options.url}api/servers/${id}/suspend`;
		opt.method = 'PATCH';
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * Unsuspend a server.
 * @param {String | Number} id The server's ID.
 * @returns  
 */

const unsuspendServer = (id) => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${options.url}/api/servers/${id}/unsuspend`;
		opt.method = 'PATCH';
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

/**
 * Delete a server.
 * @param {String | Number} id The server's ID.
 * @returns 
 */

const deleteServer = (id) => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${options.url}/api/servers/${id}`;
		opt.method = 'DELETE';
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

// -------------------------------------------|

/**
 * Lists all vouchers.
 * @returns 
 */

const listVouchers = () => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		options.url = `${opt.url}/api/vouchers`;
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

const getVoucherData = (id) => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${options.url}/api/vouchers/` + id;
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

const createVoucher = (code, uses, credits, expires) => {
	return new Promise(async (resolve, reject) => {
		const opt = options;
		opt.url = `${opt.url}/api/vouchers/`;
		opt.method = 'POST';
		if(!code || !uses || !credits) return reject('You are missing one of the requirements! Are you sure you added the vouchers name, how many uses it has and how many credits it gives?');
		if(!expires) expires = null;
		opt.data = { code: code, uses: uses, credits: credits, expires_at: expires };
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

const deleteVoucher = (id) => {
	return new Promise(async (resolve, reject) => {
		opt.url = `${options.url}/api/vouchers/${id}`;
		opt.method = 'DELETE';
		const data = await axios(opt).catch(e => reject(e));
		resolve(data.data);
	});
};

module.exports = {
	setOptions,
	getUsers,
	getUserData,
	deleteUser,
	listServers,
	getServerData,
	suspendServer,
	unsuspendServer,
	deleteServer,
	editUserCredits,
	editUserName,
	editUserRole,
	addUserCredits,
	removeUserCredits,
	getVoucherData,
	listVouchers,
	createVoucher,
	deleteVoucher,
};