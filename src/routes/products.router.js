import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', (req,res) => {
    //Handle GET request to list all the products.
    const products = productManager.getAllProducts();
    res.json(products);
});

router.post('/', (req,res) =>{
    //Handle POST request.
    const newProduct = req.body;

    if(!newProduct) {
        return res.status(400).json({error: 'Missing product data'});
    }
    const createdProduct = productManager.addProduct(newProduct);
    res.status(201).json(createdProduct);
});

router.get('/:pid', (req,res) =>{
    //Handle GET request to get a specific product bi ID.
    const productId = req.params.pid;
    const product = productManager.getProductById(productId);

    if(!product) {
        restart.status(404).json({error: 'Product not found'});
    } else {
        res.json(product);
    }
});

router.put('/:pid', (req,res) => {
    //Handle PUT request to update a product.
    const productId = req.params.pid;
    const updatedProduct = req.body;
    const product = productManager.updatedProduct(productId, updatedProduct);

    if(!product){
        res.status(404).json({error:'Product not found'});
    } else {
        res.json(product);
    }
});

router.delete('/:pid', (req,res) => {
    //Handle DELETE request to delete a product
    const productId = req.params.pid;
    const deletedProduct = productManager.deleteProduct(productId);

    if(!deletedProduct) {
        res.status(404).json({error:'Product not found'});
    } else {
        res.json(deletedProduct);
    }
});


export default router;