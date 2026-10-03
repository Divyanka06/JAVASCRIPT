document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("gymForm");
    
    const inputs = {
        name: document.getElementById("fullName"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        age: document.getElementById("age")
    };

    const errors = {
        name: document.getElementById("nameError"),
        email: document.getElementById("emailError"),
        phone: document.getElementById("phoneError"),
        age: document.getElementById("ageError")
    };

    // Validation Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Generic function to toggle visual validity states
    function setValidity(input, errorElement, isValid) {
        if (isValid) {
            input.classList.remove("invalid");
            input.classList.add("valid");
            errorElement.style.display = "none";
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
            errorElement.style.display = "block";
        }
    }

    // Validation logic for individual inputs
    function validateName() {
        const isValid = inputs.name.value.trim().length >= 3;
        setValidity(inputs.name, errors.name, isValid);
        return isValid;
    }

    function validateEmail() {
        const isValid = emailRegex.test(inputs.email.value.trim());
        setValidity(inputs.email, errors.email, isValid);
        return isValid;
    }

    function validatePhone() {
        const isValid = phoneRegex.test(inputs.phone.value.trim());
        setValidity(inputs.phone, errors.phone, isValid);
        return isValid;
    }

    function validateAge() {
        const ageVal = parseInt(inputs.age.value, 10);
        const isValid = !isNaN(ageVal) && ageVal >= 16 && ageVal <= 100;
        setValidity(inputs.age, errors.age, isValid);
        return isValid;
    }

    // Live Input Event Listeners for seamless feedback
    inputs.name.addEventListener("input", validateName);
    inputs.email.addEventListener("input", validateEmail);
    inputs.phone.addEventListener("input", validatePhone);
    inputs.age.addEventListener("input", validateAge);

    // Form submission intercept handler
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop standard form reloading

        // Run all checks at once
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isAgeValid = validateAge();

        if (isNameValid && isEmailValid && isPhoneValid && isAgeValid) {
            alert("✨ Application Submitted Successfully!");
            form.reset();
            
            // Clear out green success rings post-reset
            Object.values(inputs).forEach(input => input.classList.remove("valid"));
        } else {
            alert("❌ Please correct the errors in the form before submitting.");
        }
    });
});
