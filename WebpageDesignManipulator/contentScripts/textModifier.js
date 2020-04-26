var increasePercent = 0;
var fontFamily = "";
window.onload = function() {onLoad()};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "changeFontSize" ) {
            increasePercent = increasePercent + request.fontIncrease;
            console.log("change Font Size to " + increasePercent);
            addFontIncreaseToStorage(increasePercent);
            location.reload();
        }
        if( request.message === "changeFont" ) {
            fontFamily = request.newFont;
            addNewFontToStorage(request.newFont);
            console.log("change Font " + request.newFont)
            onload();
        }
        
    }
);

async function onLoad() {
    increasePercent = 0;
    console.log("starting to get text preference");
    getFontIncreaseFromStoreage().then(function() {
        getFontFromStoreage().then(function() {
            changeAllFont();
        });
    }); 
}

function changeAllFont() {
    changeFont("p");
    changeFont("h1");
    changeFont("h2");
    changeFont("h3");
    changeFont("h4");
    changeFont("div");
    changeFont("body");
}

function changeFont(tagName) {
    var allElements = document.getElementsByTagName(tagName);
    for (let index = 0; index < allElements.length; index++) {
        const element = allElements[index];
        changeFontSize(element);
        changeFontFamily(element);
    }
}

function changeFontSize(element) {
    var currentFontSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
    currentFontSize = currentFontSize.substring(0, currentFontSize.length - 2);
    fontSize = parseFloat(currentFontSize);
    increase = fontSize*(increasePercent/100);
    newFontSize = (fontSize + increase);
    element.style.fontSize = newFontSize + "px";
}

function getFontIncreaseFromStoreage() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['fontIncrease'], function(items) {
            console.log("Stored font is " + items.fontIncrease);
            if (items.fontIncrease != undefined) {
                increasePercent = items.fontIncrease;
            }
            console.log(increasePercent);
            resolve();
        });
    });
}

function addFontIncreaseToStorage(magnitude) {
    chrome.storage.sync.set({'fontIncrease': increasePercent}, function() {
        console.log('Settings saved');
      });
}

function changeFontFamily(element){
    console.log(fontFamily);
    element.style.fontFamily = fontFamily;
}

function loadNewFont(fontFamily){
    link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=' + fontFamily;
    link.rel = 'stylesheet';
    if (fontFamily != "") {
        try {
            document.getElementsByTagName('head')[0].appendChild(link);
        } catch (error) {
            console.log("Font doesn't exist as google font. Font serach defaulting to basic fonts")
        }
        
    }
}

function getFontFromStoreage() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['font'], function(items) {
            console.log("Stored font is " + items.font);
            fontFamily = items.font;
            loadNewFont(fontFamily);
            console.log("Font " + fontFamily);
            resolve();
        });
    });
}


function addNewFontToStorage(fontFamily) {
    chrome.storage.sync.set({'font': fontFamily}, function() {
        console.log('Settings saved');
      });
}