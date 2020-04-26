window.onload = function() {getPosotionOfAllDivElements()};


function getPosotionOfAllDivElements() {
    var allElements = document.getElementsByTagName("div");
    for (let index = 0; index < allElements.length; index++) {
        const element = allElements[index];
        //getAreaOfElement(element);
        console.log(element.classList);
        console.log(element.getBoundingClientRect());
    }
}


function getAreaOfElement(element) {
    var elementWidth = element.offsetWidth;
    var elementHeight = element.offsetHeight;

    console.log("Width " + elementWidth);
    console.log("Height " + elementHeight);
}