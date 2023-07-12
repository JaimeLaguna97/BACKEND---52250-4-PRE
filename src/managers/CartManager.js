import fs from 'fs';

class CartManager {
    constructor() {
        this.cartsFile = './data/carts.json';
    }

    createCart (newCart) {
        const carts = this.getAllCarts();
        const cartsIds = carts.map((cart) => cart.id);
        const newId = Math.max(...cartsIds) + 1;
        const cart = { id: newId, ...newCart };
        carts.push(cart);
        fs.writeFileSync(this.cartsFile, JSON.stringify(carts, null, 2));
        return cart;
    }

    getCartById(cartId){
        const carts = this.getAllCarts();
        const cart = carts.find((cart) => cart.id === cartId);
        return cart ? cart.products : null;
    }

    addProductToCart(cartId, productId, quantity){
        const carts = this.getAllCarts();
        const cartIndex = carts.findIndex ((cart) => cart.id === cartId);

        if (cartIndex !== -1) {
            const cart = carts[cartIndex];
            const productIndex = cart.products.findIndex((product) => product.id === productId);
            
            if (productIndex !== -1) {
              cart.products[productIndex].quantity += quantity;
            } else {
              cart.products.push({ id: productId, quantity });
            }
            
            fs.writeFileSync(this.cartsFile, JSON.stringify(carts, null, 2));
            return cart.products;
          }
          
        return null;
    }

    getAllCarts(){
        const cartsData = fs.readFileSync(this.cartsFile, 'utf-8');
        return JSON.parse(cartsData);
    }
}

export default CartManager;