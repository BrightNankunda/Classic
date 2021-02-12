const express = require('express');
const cors = require('cors');

const data = require('./data');
const app = express();

app.use(cors());

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x.id == productId);
    //console.log(product);
    // res.send(data.products.find(product => product.id == productId)); 
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({msg: "Product Not Found."})
    }
})

app.get("/api/products", (req, res) => {
    res.json(data.products);
});

const Port = 4555;

app.listen(Port, () => {
    console.log("Connected to PORT: " + Port)
})