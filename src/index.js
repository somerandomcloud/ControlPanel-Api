const axios = require('axios');
const validUrl = require('valid-url');
const apiToken = null;
const url = null;


/**
 * @description Sets the options for the api wrapper
 * @param {url} URL URL to the panel
 * @param {apiToken} API API token from api page
 * @returns
 */

const setOptions = async (url, apiToken) => {

	if (!validUrl.isUri(url)) return console.log('The provided url isnt a valid URI. Example of valid URI: https://google.com | Invalid URI: google.com');
	if(!url.endsWith('/')) {
		url = `${url}/`;
	}

	options = {
		method: 'GET',
		url: url,
		headers: {
			'authorization': `Bearer ${apiToken}`,
		},
	};
	console.log('Set new options!');
};

/**
 * @description Returns user data
 * @returns res.data
 */
const getUsers = async () => {
	return new Promise((resolve, reject) => {
		options['url'] = `${options.url}api/users`;
		axios(options).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

/**
 * @description Get a specified users data
 * @param {id} UserID User ID
 * @returns
 */

const getUserData = async (id) => {
	return new Promise((resolve, reject) => {
		options['url'] = `${options.url}api/users/` + id;
		axios(options).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	});
};

/**
 * @description Delete a specific user
 * @param {id} UserID User ID
 * @returns res
 */
const deleteUser = async (id) => {
	return new Promise((resolve, reject) => {
		options['url'] = `${options.url}api/users/` + id;
		options['method'] = 'DELETE';
		axios(options).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	});
};

/**
 * @description List servers
 */
const listServers = async () => {
	return new Promise((resolve, reject) => {
		options['url'] = `${options.url}api/servers`;
		axios(options).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

/**
 * @description Get a specific servers data
 * @param {id} ServerID Server ID
 */
const getServerData = async (id) => {
	return new Promise((resolve, reject) => {
		options['url'] = `${options.url}api/servers/` + id;
		axios(options).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};


const suspendServer = async (id) => {
	return new Promise((resolve, reject) => {
		options['url'] = `${options.url}api/servers/` + id + '/suspend';
		options['method'] = 'PATCH';
		axios(options).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

const unsuspendServer = async (id) => {
	return new Promise((resolve, reject) => {
		options['url'] = `${options.url}api/servers/` + id + '/unsuspend';
		options['method'] = 'PATCH';
		axios(options).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

const deleteServer = async (id) => {
	return new Promise((resolve, reject) => {
		options['url'] = `${options.url}api/servers/` + id;
		options['method'] = 'DELETE';
		axios(options).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
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
};