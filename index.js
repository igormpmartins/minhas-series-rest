const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const rtSeries = require('./routes/series')

const app = express()
const port = process.env.PORT || 3000
const mongo = 'mongodb://localhost/minhas-series-rest'

app.use(bodyParser({extended: true}))
app.use('/series', rtSeries)

mongoose
    .connect(mongo, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {

        console.log('MongoDB connected')

        app.listen(port, () => {
            console.log('server listening...')
        })

    })
    .catch(e=> {
        console.log('Erro na conexão com mongodb', e)
    })






