window.addEventListener("load", onLoad);

function onLoad() {
    const cssClassNameInput = document.getElementById('source');
    cssClassNameInput.addEventListener('input', getCssClass);
}

const getCssClass = function(e) {
    sendCssClass(e.target.value);
}

function sendCssClass(cssClassName) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "findCssClass", "cssClassName": cssClassName}, function response(response)  {
            console.log(response.foundElementsNumber);
            if (response.foundElementsNumber > 0) {
                printFoundElements(response.foundElements);
            }
        });
   });
}

function printFoundElements(foundElements) {
    for (let index = 0; index < foundElements.length; index++) {
        const element = foundElements[index];
        console.log(element);
    }
}