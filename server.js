
const http = require('http')

const Express = require('express');
var cors = require('cors')
const ex = Express()
ex.use(cors())
const body_parser = require('body-parser');

ex.use(body_parser.urlencoded({ extended: false }))

ex.get('/product', (req, res, next) => {

    res.send(`
    <form action="/product" method="POST">
       <input type="text" name="title" id=""> title
       <input type="text" name="name" id=""> name 
       <input type="text" name="image" id="">image
       <input type="text" name="price" id="">Price
       <button type="submit">Send</button>
    </form>
         
    `)
    ex.post('/product', (req, res, next) => {
        const products = req.body
        res.json({ products })
    }
    )


})

ex.listen(4000);