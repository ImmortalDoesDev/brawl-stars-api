# brawl-stars-api

An API Wrapper for [Brawl Stars API](https://developer.brawlstars.com)

# Installation

`npm install --save brawl-stars-api`

# Initialization

```js
const brawlApi = require('brawl-stars-api');
const client = new brawlApi({
    token: 'Token'
})
```
You can also use `BS_API_TOKEN` env variable for the token

## How to get a token?

You can get your token [here](https://developer.brawlstars.com)

## Club Search By Tag

```js
client
.clubByTag('#VQJPJY0L')
.then(res => console.log(res))
.catch(err => console.log(err));
```

## Player Search By Tag

```js
client
.playerByTag('#VQJPJY0L')
.then(res => console.log(res))
.catch(err => console.log(err));
```