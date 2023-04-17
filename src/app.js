import express from 'express';
import { ProductManager } from './ProductManager.js';



const app = express();
const port = 3000;

const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

app.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  const product = await productManager.getProductById(pid);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Este servidor se encucha en este puerto ${port}`);
});

//http://localhost:3000/products
//http://localhost:3000/products/3