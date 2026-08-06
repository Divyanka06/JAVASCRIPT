console.log("External JavaScript Loaded");

function showAlert() {
    alert("Hello! This alert is from External JavaScript.");
}

function externalUpdate() {
    document.getElementById("externalNote").innerHTML =
        "External JavaScript has updated this text.";
}