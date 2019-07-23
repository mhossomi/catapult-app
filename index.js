const catapult = require('./src/catapult')
const bxml = require('./src/bxml')

catapult('Catapult App', process.env.PORT || 8111, app => app
    .use((req, res) => res.sendStatus(200)))