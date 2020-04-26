window.addEventListener("mouseover", highlightElement)
window.addEventListener("mouseleave", unhighlightElement)
var highlightedBorder = null;
var previousElement = null;

function getMouseCoodinates() {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);
    return {"x": x, "y" : y};
}

function highlightElement() {
    console.log("Highlighted");
    var x = event.clientX;
    var y = event.clientY;

    var selectedElement = document.elementFromPoint(x,y);
    highlightedBorder = window.getComputedStyle(selectedElement, null).getPropertyValue('border');
    console.log(highlightedBorder);
    previousElement = selectedElement;
    console.log(selectedElement);

    changeElementBorder(selectedElement, "thick solid #0000FF");
}

function unhighlightElement() {
    console.log("LOG");
    if (previousElement != null) {
        changeElementBorder(previousElement, highlightedBorder);
    }
}

function changeElementBorder(element, colour) {
    element.style.border = colour;
}