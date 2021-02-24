const express = require('express');
const Product = require('../models/productModel');

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})

router.post('/', async (req, res) => {
    const {name, image, price, category, brand, countInStock, description} = req.body;
    const product = new Product({
        name, image, price, category,brand, countInStock, description
    });

    const newProduct = await product.save();

    if(newProduct) {
        return res.status(201).send({
            message: 'New Product created', newProduct
        })

    }
    return res.status(500).send({message: 'Error in Creating a product'})

    
})