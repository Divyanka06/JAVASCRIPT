function calculateBill() {

    let customerName = document.getElementById("customerName").value;
    let units = parseFloat(document.getElementById("units").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let discount = parseFloat(document.getElementById("discount").value);

    if (customerName.trim() === "") {
        document.getElementById("result").innerHTML =
            "<p class='error'>Please enter customer name.</p>";
        return;
    }

    if (isNaN(units) || isNaN(rate) || isNaN(discount)) {
        document.getElementById("result").innerHTML =
            "<p class='error'>Please enter all billing details.</p>";
        return;
    }

    let subtotal = units * rate;

    let discountAmount = subtotal * (discount / 100);

    let totalAmount = subtotal - discountAmount;

    document.getElementById("result").innerHTML = `
        <p class="success">Bill calculated successfully.</p>

        <p><strong>Customer:</strong> ${customerName}</p>

        <p><strong>Units:</strong> ${units}</p>

        <p><strong>Rate per unit:</strong> ₹${rate.toFixed(2)}</p>

        <p><strong>Subtotal:</strong> ₹${subtotal.toFixed(2)}</p>

        <p><strong>Discount:</strong> ${discount.toFixed(2)}%
        (₹${discountAmount.toFixed(2)})</p>

        <p><strong>Total amount:</strong> ₹${totalAmount.toFixed(2)}</p>
    `;
}


function resetForm() {

    document.getElementById("customerName").value = "";
    document.getElementById("units").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("discount").value = "";

    document.getElementById("result").innerHTML = "";
}