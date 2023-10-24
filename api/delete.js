function showDeleteConfirmation(button) {
    const productId = button.getAttribute('data-product-id');
    deleteProductId = productId;

    var overlay = document.getElementById("overlay");
    overlay.classList.add("show");
}
let deleteProductId = null;

function deleteProduct() {
    if (deleteProductId) {
        hideDeleteConfirmation();
        fetch(`http://localhost:3000/api/data/${deleteProductId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {

                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    }
}
function hideDeleteConfirmation() {
    var overlay = document.getElementById("overlay");
    overlay.classList.remove("show");

    window.location.reload();
}