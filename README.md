# qa-app

> My praiseworthy Nuxt.js project

**Disclaimer**

_*CORS origin* is turned off on the API server for testing_

_Uses PureCSS as a css reset, with a little extra classes._

TODO:

1. Gracefully handle errors and form validation

2. Better pagination / transitions

3. Refactor api calls to use built in fetch and/or vuex

## Build Setup

```bash
# install dependencies
$ yarn install
$ cd _api_server yarn install

# start api server at localhost:3333
$ cd _api_server yarn api

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
