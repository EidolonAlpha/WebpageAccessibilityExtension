//window.addEventListener("click", findSelectedElement);
window.onload = function() {onLoad()};

async function onLoad() {
    console.log("starting to get colour preference");
    changeBackgroundColour("rgb(255,255,255)", "*");
}

function changeBackgroundColour(colour, tagName) {
    var allElements = document.getElementsByTagName(tagName);
    for (let index = 0; index < allElements.length; index++) {
        const element = allElements[index];
        console.log("Tag being checked " + element.tagName);
        console.log("Backgroud Colour " + getElementBackgroundColour(element));
        console.log("Inversion of Background Colour " + getBackgroundColourAsHexValue(getElementBackgroundColour(element)));
        //ToDO invert colour
        element.style.colour = getBackgroundColourAsHexValue(getElementBackgroundColour(element));
    }
}

function getElementTextColour(element) {
    return getStyleOf(element).getPropertyValue('color');
}

function getElementBackgroundColour(element) {
    return getStyleOf(element).getPropertyValue('background-color');
}

function getStyleOf(element){
    return window.getComputedStyle(element);
}

function getBackgroundColourAsHexValue(rgbValue){
        console.log("Invert");
}