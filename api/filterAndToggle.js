function toggleStatus(button) {
    const productId = button.getAttribute('data-product-id');
    const currentStatus = button.classList.contains('available') ? 'Available' : 'Not-Available';
    const newStatus = currentStatus === 'Available' ? 'not available' : 'available';
  
    fetch(`http://localhost:3000/api/data/${productId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }), 
    })
      .then((response) => {
        if (response.ok) {

          button.textContent = newStatus;
          button.classList.toggle('available');
          button.classList.toggle('not-available');
        } else {
          console.error('Error updating status');
        }
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  }
  
  
  function applyFilters() {
    const statusFilter = document.getElementById("statusFilter").value;
    const priceFilter = document.getElementById("priceFilter").value;

    const rows = document.querySelectorAll("#productTable tr");

    rows.forEach((row) => {
      if (row.classList.contains("headerRow")) return;

      const status = row.querySelector(".statusButton").textContent;
      const price = parseFloat(row.querySelector(".price").textContent);

      const statusMatch = statusFilter === "all" || status === statusFilter;
      const priceMatch =
        priceFilter === "all" ||
        (priceFilter === "0-10" && price >= 0 && price <= 10) ||
        (priceFilter === "10-50" && price >= 10 && price <= 50) ||
        (priceFilter === "50-100" && price >= 50 && price <= 100);

      if (statusMatch && priceMatch) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }