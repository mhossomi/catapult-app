const catapult = require('./src/catapult')
const bxml = require('./src/bxml')

catapult('Catapult App', process.env.PORT || 8111, app => app
    .use("/time", (req, res) => {
        const bxml = `<?xml version="1.0" ?>`
            + `\n<Response>`
            + `\n    <SpeakSentence gender="female" voice="susan" locale="en_US">`
            + `\n        The current time is: ${new Date()}`
            + `\n    </SpeakSentence>`
            + `\n    <Hangup/>`
            + `\n</Response>`
        console.log(`Replied with:\n${bxml}`)
        res.send(bxml)
    })
    .use((req, res) => res.sendStatus(200)))