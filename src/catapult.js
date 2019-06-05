const express = require('express')
const bodyParser = require('body-parser')
const bxml = require('./bxml')

const SEP = '-'.repeat(30)

var settings = {
    showParams: true,
    showHeaders: false,
    pretty: true
}

function settingsHandler(req, res) {
    settings = Object.keys(settings)
        .reduce((out, key) => {
            out[key] = req.body[key] || settings[key];
            return out
        }, {})
    res.send(settings)
}

function loggingHandler(req, res, next) {
    let time = new Date().toISOString().replace('T', ' ')
    let lines = [SEP, `${time} ${req.method} ${req.baseUrl}`]

    if (settings.showParams && Object.keys(req.query).length > 0) {
        lines.push('Params:')
        Object.keys(req.query).forEach(key => lines.push(`  ${key}: ${req.query[key]}`))
    }

    if (settings.showHeaders && Object.keys(req.headers).length > 0) {
        lines.push('Headers:')
        Object.keys(req.headers).forEach(key => lines.push(`  ${key}: ${req.headers[key]}`))
    }

    if (settings.pretty) {
        lines.push(`${JSON.stringify(req.body, null, 2)}`)
    }
    else {
        lines.push(`${JSON.stringify(req.body)}`)
    }

    console.log(lines.join('\n'))

    next()
}

module.exports = (name, port, configurer) => {
    configurer(express()
        .use(bodyParser.json())
        .put('/settings', settingsHandler)
        .use('/*', loggingHandler)
        .get('/preset/:name', bxml.handler.fromParamToPreset('name'))
    ).listen(port, () => console.log(`Catapult '${name}' listening at ${port}`))
}