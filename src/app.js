import express from 'express';
import productsRouter from './routes/products.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import __dirname from "./utils.js";
import cartsRouter from './routes/carts.router.js';

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static((`${__dirname}/public`)));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

//CONFIG SERVER CON .IO
const server = app.listen(8080, () => console.log('Listening on port 8080'));
const io = new Server (server);

const logs = [];
const products = [];

io.on('connection', socket =>{
    console.log('New client connected');

    socket.on('message1', data =>{
        io.emit('log', data);
    });
    socket.on('message2', data =>{
        logs.push({socketId: socket.id, message:data});
        io.emit('log', {logs});
    });

    socket.on('createProduct', product =>{
        console.log('New product created', product);

        products.push(product);

        io.emit('productList', products);
    });
    
    socket.on('deleteProduct', index =>{
        console.log('Deleting product with ID:', index);

        //REMOVE THE PRODUCT FROM THE ARRAY
        if (index >= 0 && index < products.length) {
            products.splice(index, 1);
            io.emit ('productList', products);
        }
    });
});


