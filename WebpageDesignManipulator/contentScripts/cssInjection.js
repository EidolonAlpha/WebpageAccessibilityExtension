var webpageParserURL = 'http://localhost:8080';
var extensionApiURL = 'http://localhost:51058';

var userId = 61;
console.log("User id Found " + userId);
var webpageUrl = window.location.href;

window.addEventListener("load", getCSSInjectionRules);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "ChangeUser" ) {
            userId = request.userID;
            addUserIdToStorage(userId);
            location.reload();
        }
    }
);

function getCSSInjectionRules(){
    getUserIdFromStoreage().then(function getCssForUser() {
        console.log("User id " + userId);
        if (userId == undefined) {
            userId = 61;
        }
        getCssToInject(userId);
    });
}

function getCssToInject(userId) {
    return new Promise((resolve) => {
        apiRequest(extensionApiURL + '/getInjectionCssRules',{"userId":userId, "url": webpageUrl}).then(function(returnedCSS) {
            if (returnedCSS != undefined) {
                if (returnedCSS.length > 0) {
                    injectNewCssRules(returnedCSS);
                    console.log("CSS BACK");
                    resolve();
                }
            }
        });
    });
}

function injectNewCssRules(newCssRules){
    if(newCssRules != undefined){
        console.log(newCssRules);
        for (let index = 0; index < newCssRules.length; index++) {
            var newCssRule = newCssRules[index];
            //removeInlineCss(newCssRule.oldSelector);
            injectCssClass(newCssRule.newRuleSet);
        }
    }
}

function injectCssClass(newRuleSet) {
    console.log("Injecting " + newRuleSet);
    var style = document.createElement('style');
    style.innerHTML = newRuleSet;
    head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);
}

function removeInlineCss(className){
    var elementList = document.querySelectorAll(className);
    for (let index = 0; index < elementList.length; index++) {
        const element = elementList[index];
        var innerElementList = element.getElementsByTagName("*");
        for (let index = 0; index < innerElementList.length; index++) {
            const innerElement = innerElementList[index];
            innerElement.style.removeProperty('font-size');
        }
    }
}

function getUserIdFromStoreage() {
    // Read it using the storage API
    return new Promise((resolve) => {
        chrome.storage.sync.get(['user_id'], function(items) {
            if (items.user_id !== undefined) {
                console.log("User ID is " + items.user_id);
                userId = items.user_id;
            }
            resolve();
        });
    });
}

function addUserIdToStorage(userID) {
    chrome.storage.sync.set({'user_id': userID}, function() {
        console.log('Settings saved');
      });
}