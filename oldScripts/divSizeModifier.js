// window.addEventListener("mousedown", findSelectedElement);
// window.addEventListener("mouseup", resizeDiv);
window.addEventListener("click", calculatePercentage);

var allElements = document.getElementsByTagName("");
console.log("Disableing");
for (let index = 0; index < allElements.length; index++) {
    const element = allElements[index];
    disableElement(true, element)
}

function disableElement(disable, element) {
    getStyleOf(element).display="none";
}

var startingCoords;
var selectedElement

//should be in another class
function findSelectedElement() {
    console.log("MouseDown");

    var coords = getMouseCoordinates();
    startingCoords = coords;

    selectedElement = document.elementFromPoint(coords.x,coords.y);
    changeElementBorder(selectedElement, "thick solid #0000FF");
    console.log(selectedElement);
}

function getParentElementOf(element) {
    return element.parentElement;
}

function getChildElementsOf(element) {
    return element.children;
}

function findSizeChange() {
    var coords = getMouseCoordinates();
    console.log(coords)
    deltaX = coords.x - startingCoords.x;
    deltaY = coords.y - startingCoords.y;
    return {"deltaX" : deltaX, "deltaY": deltaY};
}

function getMouseCoordinates(){
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);
    return {"x": x, "y" : y};
}

function getPercentElemenetSizeOfParent(child, parent) {
    style = getStyleOf(selectedElement);
    parentStyle = style = getStyleOf(getParentElementOf(selectedElement));
    width = parseInt(style.getPropertyValue('width'));
    parentWidth = parseInt(parentStyle.getPropertyValue('width'));
    console.log("Element is "  + (width/parentWidth)*100 + " % of the parent element");
}

function resizeDiv(){
    style = getStyleOf(selectedElement);
    parentStyle = window.getComputedStyle(getParentElement(selectedElement));
    width = parseInt(style.getPropertyValue('width'));
    parentWidth = parseInt(parentStyle.getPropertyValue('width'));
    console.log("Element is "  + (width/parentWidth)*100 + " % of the parent element");
    console.log("parent width " + parentWidth);
    newWidth = width + findSizeChange().deltaX;
    console.log(newWidth);
    selectedElement.style.width = newWidth + "px";
    reload(selectedElement);
}

//Should be in another class
function reload(element){
    var content = element.innerHTML;
    element.innerHTML= content; 
    console.log("Refreshed"); 
}

function changeElementBorder(element, colour) {
    element.style.border = colour;
}

function calculatePercentage() {
    coords = getMouseCoordinates();

    selectedElement = getElementAtPos(coords);
    console.log("Selecting "  + selectedElement.tagName);
    if (selectedElement.tagName == "DIV") {
        //changeElementBorder(selectedElement, "solid red");
        parentElement = getParentElementOf(selectedElement);
        changeElementBorder(parentElement, "solid blue");
        children = getChildElementsOf(parentElement);
        parentWidth = getElementWidth(parentElement);
        console.log("Parent Width " + parentWidth);
        for( i=0; i< children.length; i++ )
        {
            var childDiv = children[i];
            changeElementBorder(childDiv, "solid green");
            var childWidth = getElementWidth(childDiv);
            console.log("Child " + i + " is " + (childWidth/parentWidth)*100 + "percent width of parent");
        }
    
        width = getElementWidth(selectedElement);
        console.log("Width" + width);
    
        console.log("Selected Child is " + (width/parentWidth)*100 + "percent width of parent");
    }
}

function getStyleOf(element){
    return window.getComputedStyle(element);
}

function getElementWidth(element) {
    style = getStyleOf(element);
    return parseInt(style.getPropertyValue('width'));
}

function getElementAtPos(coords) {
    return  document.elementFromPoint(coords.x,coords.y);
}