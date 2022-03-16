//get needed elements
let popup = document.getElementById("QR-popup");
let button = document.getElementById("QR-button");
let close = document.getElementsByClassName("QR-close")[0];

// When the button is pressed, display the popup
button.onclick = function() {
    popup.style.display = "block";
}

// When the x (close) is pressed the popup is closed
close.onclick = function() {
    popup.style.display = "none";
}
