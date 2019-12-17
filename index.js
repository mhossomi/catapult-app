const catapult = require('./src/catapult')
const bxml = require('./src/bxml')

catapult('Catapult App', process.env.PORT || 8111, app => app
    .use("/time", (req, res) => {
        res.send(`
        <?xml version="1.0" ?>
        <Response>
            <SpeakSentence gender="female" voice="susan" locale="en_US">
                The current time is: ${new Date()}
            </SpeakSentence>
        </Response>`)
    })
    .use((req, res) => res.sendStatus(200)))