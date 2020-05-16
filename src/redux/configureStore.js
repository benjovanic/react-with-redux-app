const prodStore = require('./configureStore.prod');
const devStore = require('./configureStore.dev');

// Use CommonJS require below so we can dynamically import during build-time.
module.exports = process.env.NODE_ENV === 'production' ? prodStore : devStore;
