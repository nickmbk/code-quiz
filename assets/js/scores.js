var clearButton = document.querySelector("#clear");

localStorage.getItems()

function clearStorage() {
    localStorage.clear;
}

clearButton.addEventListener("click", clearStorage);