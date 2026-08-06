const form = document.getElementById('checkForm');
const results = document.getElementById('results');

function showMessage(message, type = 'info') {
    results.className = `results ${type}`;
    results.innerHTML = `<p>${message}</p>`;
}

function isPalindrome(text) {
    const cleaned = text.toString().replace(/\s+/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}

function validatePin(pin) {
    return /^\d{4}$/.test(pin);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const pin = document.getElementById('pin').value.trim();

    // 1. Validation check for 4-digit number
    if (!validatePin(pin)) {
        showMessage('Please enter a valid 4-digit PIN.', 'error');
        return;
    }

    // 2. Output condition logic
    if (isPalindrome(pin)) {
        showMessage('This PIN is incorrect.', 'error');
    } else {
        showMessage('This PIN is correct.', 'success');
    }
});
