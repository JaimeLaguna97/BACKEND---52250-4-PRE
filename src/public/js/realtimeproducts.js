//CLIENT
const socket = io();

socket.on('productList', productList => {
  console.log('Received product list:', productList);

  const productListContainer = document.getElementById('productList');

  //CLEAR EXISTING CONTENT
  productListContainer.innerHTML = '';

  //LOOP THROUGH THE PRODUCT LIST AND CREATE HTML ELEMNTS FOR EACH ITEM
  productList.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = product.title;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.classList.add('deleteButton');

        // EVENT LISTENER FOR DELETE BUTTON
        deleteButton.addEventListener('click', () => {
          socket.emit('deleteProduct', index);
        });

        listItem.appendChild(deleteButton);
        productListContainer.appendChild(listItem);
  });
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