const env = process.env;
const fetch = require('node-fetch');
const uri = 'https://api.brawlstars.com/v1/';


class BrawlStars {

	constructor({token} = {}) {
		this.token = token || env.BS_API_TOKEN;
		if(!this.token) throw new Error('Must define a token option or BS_API_TOKEN env variable');
	}

	request(path) {
		fetch(`${uri}${path}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.token}`,
				Accept: 'application/json'
			}
		}).then(res => res.json()).then(json => {
			return json;
		}).catch(err => {
			return err;
		});
	}

	getPlayerByTag(tag){
		return this.request(`players/${encodeURIComponent(tag)}`);
	}
}
module.exports = BrawlStars;