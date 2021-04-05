const vinoModel = require('./models/vino')
const express = require('express')
const { json } = require('express')
const faker = require('faker')
const app = express()

app.use(express.json())

app.listen(8089, () => {
    
    // const mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost:27017/test-mongoose',
    // {
    //     useNewUrlParser: true, useUnifiedTopology: true
    // }
    // )
    // .then(() => console.log('se conectó piola'))
    console.log("server running on port 8089")
})

const fakeData = (q) => {
    let data = []
    for (let i = 0 ; i < q ; i++) {
        let product = {
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            pic: faker.image.imageUrl()
        }
        data.push(product)
    }
    // console.log(data)
    return data
}

app.post('/vinos', (req, res) =>{
    const vino = req.body
    const nuevoVino = new vinoModel(vino)
    nuevoVino.save()
    .then(() => {
        console.log('vino agregado')
        res.sendStatus(201)
    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })    
}) 

app.get('/vinos', (req, res) =>{
    vinoModel.find({})
    .then((vinos) => res.send(vinos))
    .catch((err) => res.send(err))
})

app.get('/productos/vista-test', async (req, res) => {
    const qParams = req.query
    // console.log(qParams)
    if (Object.keys(qParams).length === 0) {
        console.log("no hay query params")
        let data = await fakeData(10)
        res.send(data)
        return
    } else if (qParams.q == 0) {
        const msg = "No hay productos"
        res.send(msg)
    } else {
        const cantidad = qParams.q
        let data = await fakeData(cantidad)
        res.send(data)
        return

    }
})

app.put('/vinos/:id', (req, res) => {
    const id = req.params.id
    const precio = req.body.precio
    vinoModel.findByIdAndUpdate(
        {_id: id},
        {$set: { Precio: precio } }
    )
    //me devuelve el objeto antes de hacerle el update
    .then((nuevoVino) => res.send(nuevoVino))
    .catch((err) => res.send(err))
})

app.get('/vinos/:id', ((req, res) => {
    const id = req.params.id
    vinoModel.findById(id)
    .then((vino) => res.send(vino))
    .catch((err) => res.send(err))
}))

app.delete('/vinos/:id', ((req, res) => {
    const id = req.params.id
    vinoModel.findByIdAndDelete(id)
    .then(() => res.sendStatus(200))
}))

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

const vino = {
    Tipo: "tinto",
    Marca: "uvita",
    Precio: 10
}

