const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const rtSeries = require('./routes/series')
const rtUsers = require('./routes/users')
const rtAuth = require('./routes/auth')
const Auth = require('./controllers/auth')

const app = express()
const port = process.env.PORT || 3000
const mongo = process.env.MONGO || 'mongodb://localhost/minhas-series-rest'

app.use(bodyParser.json())

/* Middleware Cross-Origin Resource Sharing */
app.use(cors({

    origin: (origin, callback) => {
        if (!origin || origin  == 'null' || origin === 'http://localhost:8080') {
            callback(null, true)
        } else {
            callback(new Error('Not allowed'))
        }
    }

}))

/* Routes */
app.use('/series', rtSeries)
app.use('/users', rtUsers)
app.use('/auth', rtAuth)

mongoose
    .connect(mongo, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {

        console.log('MongoDB connected')
        Auth.checkInitUsers()

        app.listen(port, () => {
            console.log('server listening...')
        })

    })
    .catch(e=> {
        console.log('Erro na conexão com mongodb', e)
    })






