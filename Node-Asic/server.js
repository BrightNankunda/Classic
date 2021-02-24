const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mongodbUrl = "mongodb://localhost/amazona"
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoutes');

// const isAuth = require('./util')
const data = require('./data');
const app = express();

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

app.use(cors());
app.use(bodyParser.json())
// app.use(express.json());

app.use("/api/users", userRoutes);
// app.use("/api/products", isAuth, productRoutes);

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