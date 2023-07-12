import fs from 'fs';

class ProductManager {
    constructor() {
        this.productsFile = './data/products.json';
    }

    getAllProducts() {
        const productsData = fs.readFileSync(this.productsFile, 'utf-8');
        return JSON.parse(productsData);
    }

    getProductById(productId){
        const products = this.getAllProducts();
        return products.find((product) => product.id === productId);
    }

    addProduct(newProduct) {
        const products = this.getAllProducts();
        const productIds = products.map((product) => product.id);
        const newId = Math.max(...productIds) + 1;
        const product = {id:newId, ...newProduct};
        products.push(product);
        fs.writeFileSync(this.productsFile, JSON.stringify(products, null, 2));
        return product;
    }

    updateProduct(productId, updatedProduct) {
        const products = this.getAllProducts();
        const productIndex = products.findIndex((product) => product.id === productId);
        
        if (productIndex !== -1) {
          const updatedProductWithId = { id: productId, ...updatedProduct };
          products[productIndex] = updatedProductWithId;
          fs.writeFileSync(this.productsFile, JSON.stringify(products, null, 2));
          return updatedProductWithId;
        }
        
        return null;
    }

    deleteProduct(productId) {
        const products = this.getAllProducts();
        const productIndex = products.findIndex ((product) => product.id === productId);

        if (productIndex !== -1){
            const deletedProduct = products.splice(productIndex, i)[0];
            fs.writeFileSync(this.productsFile, JSON.stringify(products, null, 2));
            return deletedProduct
        }
        return null;
    }
}

export default ProductManager;