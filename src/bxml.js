const fs = require('fs')

const resolvers = {
    body: (req, key) => req.body[key],
    header: (req, key) => req.headers[key],
    query: (req, key) => req.query[key],
    env: (req, key) => process.env[key],
    none: () => undefined
}

function expand(bxml, req) {
    return bxml.replace(/\${(\w+)\.(\w+)(:(.*?))?}/g, (match, src, key, hasDefault, defaultValue) => {
        const resolver = resolvers[src] || resolvers.none
        const value = resolver(req, key)

        if (value) return value
        if (hasDefault) return defaultValue
        return `undefined: ${src}.${key}`
    })
}

function read(name) {
    return fs.readFileSync(`bxml/${name}.xml`, 'utf8')
}

function readAndSend(req, res, name) {
    try {
        const bxml = expand(read(name), req)
        res.send(bxml)
        console.log(`Replied with:\n${bxml}`)
    } catch (e) {
        res.sendStatus(404)
        console.log(e)
        console.log(`Not found: bxml/${name}.xml`)
    }
}

module.exports = {
    read,
    write: (lines) => '<?xml version="1.0" ?><Response>'
        + lines.join('\n')
        + '</Response>',
    handler: (req, res) => readAndSend(req, res, req.baseUrl.substring(6))
}