chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "findCssClass" ) {
            console.log("Searching for : " + request.cssClassName);
            const foundElements = document.querySelectorAll("." + request.cssClassName);
            for (let index = 0; index < foundElements.length; index++) {
                const element = foundElements[index];
                var elementString = new XMLSerializer().serializeToString(element);
                console.log(elementString);
            }
            if (foundElements != null) {
                console.log(foundElements.length);
                sendResponse({foundElementsNumber : foundElements.length, "foundElements": foundElements});
            }
        }
    }
);