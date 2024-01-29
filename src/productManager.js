import { promises as fs } from 'fs';

class ProductManager {
  constructor(path) {
    this.lastProductId = 0;
    this.path = path
  }

  async addProduct(product) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      throw new Error("All fields are required");
    }

    if (products.find(prod => prod.code === code)) {
      throw new Error("Product with the same code already exists");
    }

    const id = ++this.lastProductId;
    product.id = id;

    products.push(product);
    await fs.writeFile(this.path, JSON.stringify(products))

    return id;
  }

  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    return products;
  }

  async getProductById(id) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    const product = products.find(prod => prod.id === id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    const index = products.findIndex(prod => prod.id === id)
    if (index !== -1) {
    products[index].title = title
    products[index].description = description
    products[index].price = price
    products[index].thumbnail = thumbnail
    products[index].code = code
    products[index].stock = stock
    await fs.writeFile(this.path, JSON.stringify(products))
    }
    else {
      return "Product doesn't exist"
    }
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    const index = products.findIndex(prod => prod.id === id)
    if (index !== -1) {
      const filteredProducts = products.filter(prod => prod.id != id)
      await fs.writeFile(this.path, JSON.stringify(filteredProducts))
      return "Product deleted successfully"
    }
    else {
      return "product doesn't exist"
    }
  }
}

export default ProductManager
