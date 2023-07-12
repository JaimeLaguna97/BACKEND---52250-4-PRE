//CLIENT
const socket = io();

socket.on('productList', productList => {
  console.log('Received product list:', productList);
  console.log('ProductList');
});

const form = document.getElementById('createProductForm');

form.addEventListener('submit', event => {
  event.preventDefault();

  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;

  const product = {
    title: title,
    description: description
  };

  socket.emit('createProduct', product);

  form.reset();
});