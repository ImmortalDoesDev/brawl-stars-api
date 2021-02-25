const env = process.env;
const fetch = require('node-fetch');
const uri = 'https://api.brawlstars.com/v1/';

class Failed {
	constructor(reason, message, status) {
		this.status = status;
		this.reason = reason;
		this.message = message;
	}
}

class BrawlStars {

	constructor({token} = {}) {
		this.token = token || env.BS_API_TOKEN;
		if(!this.token) throw new Error('Must define a token option or BS_API_TOKEN env variable');
	}

	async request(path) {
		const res = await fetch(`${uri}${path}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.token}`,
				Accept: 'application/json'
			},
		});
		const parsed = await res?.json();
		parsed.status = res.status;
		if(res.status !== 200) return {
			status: res.status,
			reason: parsed.reason,
			message: parsed.message ?? null
		};
		return parsed;
	}

	parseTag(tag) {
		if (tag && typeof tag === 'string') {
			return encodeURIComponent(`#${tag.toUpperCase().replace(/O|o/g, '0').replace(/^#/g, '')}`);
		}
		throw TypeError('The "tag" argument must be of type string.');
	}

	async playerByTag(tag){
		let response = await this.request(`players/${this.parseTag(tag)}`);

		if(response.status !== 200) throw new Failed(response.reason, response.message, response.status);
		return response;
	}

	async clubByTag(tag){
		let response = await this.request(`clubs/${this.parseTag(tag)}`);

		if(response.status !== 200) throw new Failed(response.reason, response.message, response.status);
		return response;
	}
}
module.exports = BrawlStars;