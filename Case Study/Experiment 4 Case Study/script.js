document.addEventListener("DOMContentLoaded", () => {
    const verifyBtn = document.getElementById("verifyBtn");
    verifyBtn.addEventListener("click", verifyPassword);
});

function verifyPassword() {
    const passwordInput = document.getElementById("passwordInput");
    const statusDiv = document.getElementById("status");
    const password = passwordInput.value;

    if (!password) {
        alert("Please enter a password.");
        return;
    }

    const cleanedPassword = password.toLowerCase();
    const reversedPassword = cleanedPassword.split('').reverse().join('');

    if (cleanedPassword === reversedPassword) {
    
        statusDiv.innerHTML = "Status: Weak Password";
        statusDiv.className = "weak";
        
        alert("Security Alert: Your password is a palindrome and is weak!\nPlease change your password.");

        passwordInput.value = "";
    } else {

        statusDiv.innerHTML = "Status: Strong Password";
        statusDiv.className = "strong";
        alert("Success: Strong password accepted.");
    }
}
