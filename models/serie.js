const mongoose = require('mongoose')

const CommentsSchema = mongoose.Schema({
    type: String
})

const SerieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enumValues: ['to-watch', 'watching', 'watched']
    },
    comments: [CommentsSchema]
})

const Serie = mongoose.model('Serie', SerieSchema)

module.exports = Serie
