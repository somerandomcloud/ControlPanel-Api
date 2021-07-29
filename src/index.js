const axios = require('axios');
const apiToken = null;
const url = null;

const checkUrl = (url) => {
	return new Promise(async (resolve) => {
		/* eslint no-useless-escape: "off" */

		const res = String(url).match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi);
		resolve(res !== null);
	});
};

/**
 * @description Sets the options for the api wrapper
 * @param {url} URL URL to the panel
 * @param {apiToken} API API token from api page
 * @returns
 */

const setOptions = async (url, apiToken) => {

	if (!checkUrl(url)) return console.log('The provided url isnt a valid URI. Example of valid URI: https://google.com | Invalid URI: google.com');
	if(!url.endsWith('/')) {
		url = `${url}/`;
	}

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
 * @description Returns user data
 * @returns res.data
 */
const getUsers = async () => {
	return new Promise((resolve, reject) => {
		const getUserOpt = { ...options };

		getUserOpt['url'] = `${options.url}api/users`;
		axios(getUserOpt).then(res => {
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
		const getUserDataOpt = { ...options };

		getUserDataOpt['url'] = `${options.url}api/users/` + id;
		axios(getUserDataOpt).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	});
};

const editUserName = async (id, newName) => {
	return new Promise((resolve, reject) => {
		const editUsrNameOpt = { ...options };

		editUsrNameOpt['url'] = `${options.url}api/users/` + id;
		editUsrNameOpt['method'] = 'PATCH';
		editUsrNameOpt['data'] = { 'name': newName };
		if (!newName) return console.log('You need to define a name!');
		axios(editUsrNameOpt).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	});
};

const editUserCredits = async (id, newNumber) => {
	return new Promise((resolve, reject) => {
		const editUsrCredsOpt = { ...options };

		editUsrCredsOpt['url'] = `${options.url}api/users/` + id;
		editUsrCredsOpt['method'] = 'PATCH';
		if (!newNumber) return console.log('You need to define a new balance number!');
		if (isNaN(newNumber)) return console.log('That is not a number!');
		editUsrCredsOpt['data'] = { 'credits': newNumber };
		axios(editUsrCredsOpt).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	});
};

const editUserRole = async (id, newRole) => {
	return new Promise((resolve, reject) => {
		const editUsrRoleOpt = { ...options };

		editUsrRoleOpt['url'] = `${options.url}api/users/` + id;
		editUsrRoleOpt['method'] = 'PATCH';
		editUsrRoleOpt['data'] = { 'role': newRole };
		if (newRole == admin | mod | client | member) return console.log('You didnt define a valid role! Has to be one of these: \'admin\', \'mod\', \'client\', \'member\'');
		axios(editUsrRoleOpt).then(res => {
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
		const delUsrOpt = { ...options };

		delUsrOpt['url'] = `${options.url}api/users/` + id;
		delUsrOpt['method'] = 'DELETE';
		axios(delUsrOpt).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	});
};

const addUserCredits = async (id, addXCredits) => {
	return new Promise((resolve, reject) => {
		getUserData(id).then(res => {
			const addUsrCredsOpt = { ...options };

			addUsrCredsOpt['method'] = 'PATCH';
			if (!newNumber) return console.log('You need to define a number to add to the existing balance!');
			if (isNaN(newNumber)) return console.log('That is not a number!');
			addUsrCredsOpt['data'] = { 'credits': res.data.credits + newNumber };
			axios(addUsrCredsOpt).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		}).catch(err => {
			reject(err);
		});
	});
};

const removeUserCredits = async (id, removeXCredits) => {
	return new Promise((resolve, reject) => {
		getUserData(id).then(res => {
			const removeUsrCredsOpt = { ...options };

			removeUsrCredsOpt['method'] = 'PATCH';
			if (!removeXCredits) return console.log('You need to define a number to remove from the existing balance!');
			if (isNaN(removeXCredits)) return console.log('That is not a number!');
			removeUsrCredsOpt['data'] = { 'credits': res.data.credits - removeXCredits };
			axios(removeUsrCredsOpt).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		}).catch(err => {
			reject(err);
		});
	});
};

// -------------------------------------------|

/**
 * @description List servers
 */
const listServers = async () => {
	return new Promise((resolve, reject) => {
		const listServersOpt = { ...options };

		listServersOpt['url'] = `${options.url}api/servers`;
		axios(listServersOpt).then(res => {
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
		const getSrvDataOpt = { ...options };

		getSrvDataOpt['url'] = `${options.url}api/servers/` + id;
		axios(getSrvDataOpt).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};


const suspendServer = async (id) => {
	return new Promise((resolve, reject) => {
		const suspendServerOpt = { ...options };

		suspendServerOpt['url'] = `${options.url}api/servers/` + id + '/suspend';
		suspendServerOpt['method'] = 'PATCH';
		axios(suspendServerOpt).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

const unsuspendServer = async (id) => {
	return new Promise((resolve, reject) => {
		const unSusServerOpt = { ...options };

		unSusServerOpt['url'] = `${options.url}api/servers/` + id + '/unsuspend';
		unSusServerOpt['method'] = 'PATCH';
		axios(unSusServerOpt).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

const deleteServer = async (id) => {
	return new Promise((resolve, reject) => {
		const delServerOpt = { ...options };

		delServerOpt['url'] = `${options.url}api/servers/` + id;
		delServerOpt['method'] = 'DELETE';
		axios(delServerOpt).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

// -------------------------------------------|

const listVouchers = async () => {
	return new Promise((resolve, reject) => {
		const listVouchersOpt = { ...options };

		listVouchersOpt['url'] = `${options.url}api/vouchers`;
		axios(listVouchersOpt).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

const getVoucherData = async (id) => {
	return new Promise((resolve, reject) => {
		const getVoucherDataOpt = { ...options };

		getVoucherDataOpt['url'] = `${options.url}api/vouchers/` + id;
		axios(getVoucherDataOpt).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

const createVoucher = async (code, uses, credits, expires) => {
	return new Promise((resolve, reject) => {
		const createVoucherOpt = { ...options };

		createVoucherOpt['url'] = `${options.url}api/vouchers/`;
		createVoucherOpt['method'] = 'POST';
		if(!code | !uses | !credits) return reject('You are missing one of the requirements! Are you sure you added the vouchers name, how many uses it has and how many credits it gives?');
		if(!expires) expires = null;
		createVoucherOpt['data'] = { code: code, uses: uses, credits: credits, expires_at: expires };
		axios(createVoucherOpt).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

const deleteVoucher = async (id) => {
	return new Promise((resolve, reject) => {
		const deleteVoucherOpt = { ...options };

		deleteVoucherOpt['url'] = `${options.url}api/vouchers/` + id;
		deleteVoucherOpt['method'] = 'DELETE';
		axios(deleteVoucherOpt).then(res => {
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

// To publish: npm publish --access public