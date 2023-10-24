function showAddProduct() {
    var overlay = document.getElementById("addProductContainer");
    overlay.classList.add("show");
}

function addProduct() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;

    const product = {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
    };

    fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            if (response.ok) {
                clearForm();
                showSuccessMessage();
            }
        });
}

function showSuccessMessage() {
    const successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";
    setTimeout(function () {
        successMessage.style.display = "none";
    }, 3000); 
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

function cancelAddProduct() {
    var overlay = document.getElementById("addProductContainer");
    overlay.classList.remove("show");

    window.location.reload();
}