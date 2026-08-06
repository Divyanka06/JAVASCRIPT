document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("togglePassword");
    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");

    // Elements for password rule validation targets
    const rules = {
        length: document.getElementById("length"),
        uppercase: document.getElementById("uppercase"),
        lowercase: document.getElementById("lowercase"),
        number: document.getElementById("number"),
        special: document.getElementById("special")
    };

    // 1. Password Visibility Show/Hide Logic
    togglePasswordBtn.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordBtn.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            togglePasswordBtn.textContent = "Show";
        }
    });

    // 2. Real-Time Regex Password Evaluation Engine
    passwordInput.addEventListener("input", () => {
        const val = passwordInput.value;

        // Condition maps matched using regex testing
        const flags = {
            length: val.length >= 8,
            uppercase: /[A-Z]/.test(val),
            lowercase: /[a-z]/.test(val),
            number: /[0-9]/.test(val),
            special: /[*@$!%?&]/.test(val)
        };

        // Loop over element keys to apply valid/invalid state styles
        for (const key in rules) {
            if (flags[key]) {
                rules[key].classList.remove("invalid");
                rules[key].classList.add("valid");
            } else {
                rules[key].classList.remove("valid");
                rules[key].classList.add("invalid");
            }
        }

        // Enable Submit trigger only when every individual criteria evaluates true
        const allRulesPassed = Object.values(flags).every(Boolean);
        loginBtn.disabled = !allRulesPassed;
    });

    // 3. Secure Interception of Form Submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const rollNumber = document.getElementById("rollNumber").value;

        alert(`Successfully validated user registration!\nName: ${username}\nRoll No: ${rollNumber}`);
    });
});
