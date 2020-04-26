var webpageParserURL = 'http://localhost:8080';
var extensionApiURL = 'http://localhost:51058';

var userId = 61;
console.log("User id Found " + userId);
var webpageUrl = window.location.href;

window.addEventListener("load", sendCssToWebpageReader);

function sendCssToWebpageReader() {
    sendCSS(getPagesCssRules());
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "SendCSS" ) {
            sendCSS(getPagesCssRules());
        }
        if( request.message === "SaveCSS" ) {
            saveCSS(userId, getPagesCssRules());
        }
        if (request.message === "DeleteCSS") {
            deleteCssFromDatabase();
            reload();
        }
    }
);

function getPagesCssRules() {
    var rulesInDocument = [];
    var linksToExtrnalCSS = [];
    for (let index = 0; index < document.styleSheets.length; index++) {
        var styleSheet = document.styleSheets[index]; 
        if (styleSheet != undefined) {
            try {
                var rules = styleSheet.rules;
                for (var i = 0; i < rules.length; i++) {
                    rulesInDocument.push(styleSheet.rules[i].cssText);
                }
            } catch (error) {
                linksToExtrnalCSS.push(styleSheet.href);
            }
        }
    }
    return {"rules" : rulesInDocument, "links" : linksToExtrnalCSS};
}

function sendCSS(rulesInDocument){
    console.log("SENDING CSS TO WEBPAGE PARSER");
    return new Promise((resolve) => {
        apiRequest(webpageParserURL + '/CSSRules', rulesInDocument).then(function() {
            resolve();
        });
    });
}

function saveCSS(userId, rulesInDocument){
    console.log("Save CSS");
    return new Promise((resolve) => {
        apiRequest(webpageParserURL + '/SaveCssChanges', rulesInDocument).then(function(returnedCss) {
            if (returnedCss != undefined) {
                injectNewCssRules(returnedCss);
                saveCssToDatabase(userId, returnedCss);
            }
            else {
                console.log("CSS Not Saved");
            }
            resolve();
        });
    });
}

function saveCssToDatabase(userId, cssToSave) {
    console.log(cssToSave);
    apiRequest(extensionApiURL + '/saveInjectionCssRules',{"userId":userId, "url": webpageUrl, "cssRules": cssToSave}).then(function(returnedCSS) {
        if (returnedCSS != undefined) {
            console.log(returnedCSS);
            console.log("CSS Saved");
        }
    });
}

function deleteCssFromDatabase() {
    return new Promise((resolve) => {
        apiRequest(extensionApiURL + '/deleteWebpageModification',{"userId":userId, "url": webpageUrl}).then(function(returnedCSS) {
            if (returnedCSS != undefined) {
                console.log(returnedCSS);
                console.log("CSS Deleted");
                resolve();
            }
        });
    });
}

function reload() {
    location.reload();
}