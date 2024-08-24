const authResolver = require('./auth');
const itemsResolver = require('./items');


const rootResolver = {
    ...authResolver,
    ...itemsResolver
}

module.exports = rootResolver;