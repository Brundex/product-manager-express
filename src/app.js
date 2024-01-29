import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const port = 8080;
const productManager = new ProductManager('products.json');

app.use(express.json());
app.get('/products', async (req, res) => {
    try {
      const limit = req.query.limit;
      const products = await productManager.getProducts();
  
      if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit, 10));
        res.send({limitedProducts});
      } else {
        res.send({products});
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.get('/products/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id, 10);
      const product = await productManager.getProductById(productId);
      res.send({product});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });