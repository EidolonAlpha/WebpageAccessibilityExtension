var baseUrl = 'http://localhost:8080';

window.addEventListener("click", findSelectedElement);

function getMouseCoordinates(){
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);
    return {"x": x, "y" : y};
}

function findSelectedElement() {
    console.log("Click");

    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;

    console.log(coords);

    var elementFamily = [];

    var selectedElement = document.elementFromPoint(x,y);
    var thing_to_send = {cssPath: undefined, width : undefined, height : undefined};
    var thing_to_send_list = [];
    var childElements = getElementParent(selectedElement).children;
    //getPosotionOfAllDivElements(childElements);
    for (let index = 0; index < childElements.length; index++) {
        thing_to_send = new Object;
        const element = childElements[index];
        thing_to_send.cssPath = generateCssPathStringForElement(element);
        thing_to_send.width = getWidthAsPercentage(element);
        thing_to_send.height = getHeightAsPercentage(element);
        // console.log("Width of " + element.nodeName +" : " + getWidthAsPercentage(element));
        // console.log("Css Path :" + generateCssPathStringForElement(element));
        console.log("Height of " + element.nodeName +" : " + thing_to_send.height);
        console.log("Width of " + element.nodeName +" : " + thing_to_send.width);
        console.log("Css Path :" + thing_to_send.cssPath);
        thing_to_send_list.push("cssPath: " + thing_to_send.cssPath + ", width : " + thing_to_send.width  + ", height : " + thing_to_send.height);
    }
    sendElementPositioning(thing_to_send_list);

    //console.log("Width : " + getWidthAsPercentage(selectedElement));


    //console.log("Css Path :" + generateCssPathStringForElement(selectedElement));
    // var parent = selectedElement.parentElement;
    // while (parent != null) {
    //     var selectedElementCss = {elementClassList: selectedElement.classList, elementType: selectedElement.tagName};
    //     elementFamily.push(selectedElementCss);
    //     selectedElement = selectedElement.parentElement;
    //     parent = selectedElement.parentElement;
    // }
    // console.log(elementFamily);
}

function getWidthAsPercentage(element){
    var offsetParent = element.parentElement;
    return ((element.offsetWidth/offsetParent.offsetWidth)*100).toFixed(2) + '%';
}

function getHeightAsPercentage(element){
    var offsetParent = element.parentElement;
    console.log(offsetParent.nodeName);
    return ((element.offsetHeight/offsetParent.offsetHeight)*100).toFixed(2) + '%';
}

function sendElementPositioning(elementList){
    return new Promise((resolve) => {
        apiRequest(baseUrl + '/elementPositioning', elementList).then(function() {
            resolve();
        });
    });
}


function getPosotionOfAllDivElements(allElements) {
    var divSizes = {rectangle: element.getBoundingClientRect, width};

    for (let index = 0; index < allElements.length; index++) {
        const element = allElements[index];
        console.log(element.classList);
        console.log(element.getBoundingClientRect());
    }
}

function getElementParent(element) {
    var parent = element.parentElement;
    console.log(parent.nodeName);
    return parent;
}

function getElementChildren(element) {
    var childList = element.children;
    for (let i = 0; i < childList.length; i++) {
        const foundElement = childList[i];
        console.log("Child of " + element.nodeName + " " + element.classList + " " + foundElement.classList);
    }
}

function generateCssPathStringForElement(element){
    var cssPathString = "";
    var currentElement = element;
    var parent = currentElement.parentElement;
    while (parent != null) {
        for (let i = currentElement.classList.length -1; i >= 0; i--) {
            var cssClass = currentElement.classList[i];
            //console.log(cssClass);
            if (cssClass.length > 0) {
                cssPathString = "." + cssClass + cssPathString;
            }
        }
        if (cssPathString.length > 0) {
           cssPathString = " " + cssPathString; 
        }
        currentElement = currentElement.parentElement;
        parent = currentElement.parentElement;
    }
    return cssPathString;
}

//GENERAL CODE FOR MAKING REQUESTS TO API

function apiRequest(url, body){
    var requester = new RequestSender();
    return requester.apiRequest(url, body);
}

class RequestSender {
    apiRequest(url, body){
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({URL : url, BODY : body}, function (response) {
                resolve(response);
            });
        });
    }
}