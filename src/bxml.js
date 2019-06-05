const fs = require('fs')

function replyPreset(res, name) {
    try {
        res.send(fs.readFileSync(`bxml/${name}.xml`))
        console.log(`Replied with: bxml/${name}.xml`)
    } catch (e) {
        res.sendStatus(404)
        console.log(`Not found: bxml/${name}.xml`)
    }
}

module.exports = {
    handler: {
        fromPreset: (name) => (req, res) => replyPreset(res, name),
        fromParamToPreset: (param) => (req, res) => replyPreset(res, req.params[param])
    },
    read: (name) => fs.readFileSync(`bxml/${name}.xml`, 'utf8'),
    write: (lines) => '<?xml version="1.0" ?><Response>'
        + lines.join('\n')
        + '</Response>'
}