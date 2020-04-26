window.addEventListener("load", buttonFinder);
window.addEventListener("resize", buttonFinder);

function buttonFinder() {
    var buttons = document.querySelectorAll("button");
    console.log("Buttons Found " + buttons.length);
    var anchors = document.querySelectorAll("a");
    console.log("Anchors Found " + anchors.length);

    for (let index = 0; index < anchors.length; index++) {
        const element = anchors[index];
        setElementDisplayType(element);
        setMouseFunctionsToElement(element);
    }
}

function setElementDisplayType(element) {
    var display = window.getComputedStyle(element, null).getPropertyValue('display')
    console.log(element);
    console.log(display);
    if (display != "inline-block" && display != "flex" && display != "none" && display != "block" && display != "inline") {
        console.log(element);
        element.style.display = "block";
    }
}

function setMouseFunctionsToElement(element) {
    element.onmouseover = function() {mouseOver(element)};
    element.onmouseout = function() {mouseOut(element)};
}

function mouseOver(element) {
    element.style.outline = "inset";
}
  
function mouseOut(element) {
    element.style.outline = "";
}