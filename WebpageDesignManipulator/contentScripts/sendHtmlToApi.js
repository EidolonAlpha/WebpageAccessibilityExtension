var webpageParserURL = 'http://localhost:8080';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "SendHTML" ) {
            getAndDeliverHTML();
        }
    }
  );

window.addEventListener("load", getAndDeliverHTML);

function getAndDeliverHTML(){
    var htmlString = getHTML();
    sendHTML(htmlString);
}

function getHTML() {
    return document.documentElement.outerHTML;
}

function sendHTML(htmlString){
    return new Promise((resolve) => {
        apiRequest(webpageParserURL + '/HtmlExtraction', htmlString).then(function() {
            console.log("Sending HTML");
            resolve();
        });
    });
}