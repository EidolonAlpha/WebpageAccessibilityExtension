var active = false;
window.addEventListener("load", ActivateReducedLightMode);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "ToggleReducedLightMode" ) {
            if (active) {
                addReducedLightModeSwitchToStorage(false);
                location.reload();
            }
            else {
                addReducedLightModeSwitchToStorage(true);
                ActivateReducedLightMode();
            }
        }
    }
);

function ActivateReducedLightMode() {
    active = getIsReducedLightModeActiveFromStoreage().then(function toogleReducedLight() {
        if (active) {
            reduceLightModeElements("*");
        }
    });
}

function reduceLightModeElements(tagName) {
    var allElements = document.querySelectorAll(tagName);
    for (let index = 0; index < allElements.length; index++) {
        const element = allElements[index];
        if (element.tagName === "img") {
            element.style.filter = "brightness(80%)";
        }
        else {
            var elementColour = window.getComputedStyle(element, null).backgroundColor;
            var rgbBackground = darkenRGB(elementColour);
            var elementTextColour = window.getComputedStyle(element, null).Color;
            var rgbText = lightenRGB(elementTextColour);
            // var elementBorderColour = window.getComputedStyle(element, null).borderColor;
            // var rgbBorder = lightenRGB(elementBorderColour);
            // var elementColoumnRuleColour = window.getComputedStyle(element, null).columnRuleColor;
            // var rgbColoumnRule = lightenRGB(elementColoumnRuleColour);
            // var elementColoumnRuleColour = window.getComputedStyle(element, null).borderBottom;
            // var rgbBottomBorder = lightenRGB(elementColoumnRuleColour);

            element.style.setProperty("background-color", "rgb(" + rgbBackground.red + "," + rgbBackground.green + "," + rgbBackground.blue + ")", "important");
            element.style.setProperty("color", "rgb(" + rgbText.red + "," + rgbText.green + "," + rgbText.blue + ")", "important");
            //element.style.setProperty("border-color", "rgb(" + rgbBorder.red + "," + rgbBorder.green + "," + rgbBorder.blue + ")", "important");
            //element.style.setProperty("column-rule-color", "rgb(" + rgbColoumnRule.red + "," + rgbColoumnRule.green + "," + rgbColoumnRule.blue + ")", "important");
            //element.style.setProperty("border-bottom", "rgb(" + rgbBottomBorder.red + "," + rgbBottomBorder.green + "," + rgbBottomBorder.blue + ")", "important");
        }
    }
}

function darkenRGB(colourValue){
    var rgbObj = {red: "", blue : "", green : ""};
    if (colourValue != undefined) {
        var rgb = "";
        var rgbSplit = [];
        if (colourValue.substr(0,4) === "rgb(") {
            rgb = colourValue.substr(4,colourValue.length - 5);
            rgbSplit = rgb.split(',')
            rgbObj.red = (rgbSplit[0] * 0.8);
            rgbObj.blue = (rgbSplit[1] * 0.8);
            rgbObj.green = (rgbSplit[2] * 0.8);
        }
    }
    return rgbObj;
}

function lightenRGB(colourValue){
    var rgbObj = {red: "", blue : "", green : ""};
    if (colourValue != undefined) {
        var rgb = "";
        var rgbSplit = [];
        if (colourValue.substr(0,4) === "rgb(") {
            rgb = colourValue.substr(4,colourValue.length - 5);
            rgbSplit = rgb.split(',')
            rgbObj.red = rgbSplit[0] + (rgbSplit[0] * 0.25);
            rgbObj.blue = rgbSplit[1] + (rgbSplit[1] * 0.25);
            rgbObj.green = rgbSplit[2] + (rgbSplit[2] * 0.25);
        }
    }
    return rgbObj;
}

function getRGBObject(colourValue) {
    var rgbObj = {red: "", blue : "", green : ""};
    if (colourValue != undefined) {
        var rgb = "";
        var rgbSplit = [];
        if (colourValue.substr(0,4) === "rgb(") {
            rgb = colourValue.substr(4,colourValue.length - 5);
            rgbSplit = rgb.split(',')
            rgbObj.red = rgbSplit[0];
            rgbObj.blue = rgbSplit[1];
            rgbObj.green = rgbSplit[2];
        }
    }
    return rgbObj;
}

function getIsReducedLightModeActiveFromStoreage() {
    // Read it using the storage API
    return new Promise((resolve) => {
        chrome.storage.sync.get(['reduced_light_mode'], function(items) {
            console.log("Reduced Light Mode is " + items.reduced_light_mode);
            active = items.reduced_light_mode;
            resolve();
        });
    });
}

function addReducedLightModeSwitchToStorage(on) {
    chrome.storage.sync.set({'reduced_light_mode': on}, function() {
        console.log('Settings saved');
      });
}