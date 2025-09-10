function sendMoney(){
  const recipient = document.getElementById('recipient').value;
  const phone = document.getElementById('userPhone').value;
  const item = document.getElementById('itemSelected').value;
  const amount = document.getElementById('amount').value;
  const note = document.getElementById('note').value;
  const screenshotInput = document.getElementById('paymentScreenshot');
  const file = screenshotInput.files[0];

  if(!phone || !phone.startsWith('+ydrs')) { alert("Enter valid phone starting +ydrs"); return; }
  if(!amount || amount < 30000 || !item) { alert("Select valid product"); return; }

  // Convert image to Base64
  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      saveTransaction(phone, recipient, item, amount, note, e.target.result);
    }
    reader.readAsDataURL(file);
  } else {
    saveTransaction(phone, recipient, item, amount, note, null);
  }
}

function saveTransaction(phone, recipient, item, amount, note, screenshot){
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  transactions.push({
    userPhone: phone,
    recipient,
    item,
    amount: Math.round(amount), // remove decimals
    note: note || '-',
    screenshot: screenshot,
    date: new Date().toLocaleString()
  });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  alert("Payment submitted!");
  document.getElementById('note').value='';
  document.getElementById('paymentScreenshot').value='';
  updateTransactionList();
}
