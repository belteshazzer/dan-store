let productId = null;

function editProduct(button) {
    productId = button.getAttribute('data-product-id');
    fetch(`http://localhost:3000/api/data/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            document.getElementById('editName').value = product.product_name;
            document.getElementById('editDescription').value = product.Description;
            document.getElementById('editPrice').value = product.price;
            document.getElementById('editQuantity').value = product.quantity;
            showEditModal()
        })
        .catch((error) => {
            console.error('Error fetching product details:', error);
        });
}

function showEditModal() {
    const editModal = document.getElementById('editProductModal');
    editModal.classList.add("show");
}

function save() {
    const editedProduct = {
        name: document.getElementById('editName').value,
        description: document.getElementById('editDescription').value,
        price: parseFloat(document.getElementById('editPrice').value),
        quantity: parseInt(document.getElementById('editQuantity').value),
    };
    fetch(`http://localhost:3000/api/data/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
    })
        .then((response) => {
            if (response.ok) {
                cancelEdit();
                window.location.reload();
            } else {
                console.error('Error updating product');
            }
        })
        .catch((error) => {
            console.error('Error updating product:', error);
        });
}


function cancelEdit() {
    const editModal = document.getElementById('editProductModal');
    editModal.classList.remove("show");
}