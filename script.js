// Select product
function selectItem(itemName, price){
  document.getElementById('itemSelected').value = itemName;
  document.getElementById('amount').value = price;

  // Smooth scroll to payment section
  document.getElementById('paymentForm').scrollIntoView({ behavior: 'smooth' });
}