const mongoose = require('mongoose')

const vinoCollection = 'vino'

const VinoSchema = new mongoose.Schema({
    Tipo:{ type: String, required: true, max: 50 },
    Marca:{ type: String, required: true, max: 70 },
    Precio:{ type: Number, required: true, max: 50 },
})

module.exports = mongoose.model(vinoCollection, VinoSchema)
