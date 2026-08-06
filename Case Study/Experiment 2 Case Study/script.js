document.getElementById("billingForm").addEventListener("submit", calculateBill);

function calculateBill(event){

    event.preventDefault();

    const name=document.getElementById("custName").value;
    const mobile=document.getElementById("mobileNo").value;
    const invoice=document.getElementById("invoiceNo").value;
    const product=document.getElementById("productName").value;

    const qty=parseFloat(document.getElementById("quantityKg").value);
    const rate=parseFloat(document.getElementById("rateKg").value);

    const member=parseFloat(document.getElementById("membership").value);
    const gst=parseFloat(document.getElementById("gstRate").value);

    const packing=parseFloat(document.getElementById("packingCharges").value);

    const payment=document.getElementById("paymentMode").value;

    const baseAmount=qty*rate;

    const discount=(baseAmount*member)/100;

    const afterDiscount=baseAmount-discount;

    const gstAmount=(afterDiscount*gst)/100;

    const total=afterDiscount+gstAmount+packing;

    document.getElementById("outInv").innerText=invoice;
    document.getElementById("outName").innerText=name;
    document.getElementById("outMobile").innerText=mobile;
    document.getElementById("outProduct").innerText=product;
    document.getElementById("outQtyRate").innerText=qty+" kg @ ₹"+rate+"/kg";
    document.getElementById("outBase").innerText="₹"+baseAmount.toFixed(2);
    document.getElementById("outMemberDisc").innerText="- ₹"+discount.toFixed(2)+" ("+member+"%)";
    document.getElementById("outGst").innerText="+ ₹"+gstAmount.toFixed(2)+" ("+gst+"%)";
    document.getElementById("outPacking").innerText="+ ₹"+packing.toFixed(2);
    document.getElementById("outPayMode").innerText=payment;
    document.getElementById("outTotal").innerText="₹"+total.toFixed(2);

    document.getElementById("invoiceSection").style.display="block";
}