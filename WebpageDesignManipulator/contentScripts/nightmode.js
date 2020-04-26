var active = false;
var startTime  = 21;
var endTime = 9;
window.addEventListener("load", ActivateNightMode);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "ToggleNightMode" ) {
            if (active) {
                addNightModeSwitchToStorage(false);
                location.reload();
            }
            else {
                addNightModeSwitchToStorage(true);
                ActivateNightMode();
            }
        }
    }
);

function ActivateNightMode() {
    var today = new Date();
    var time = today.getHours();
    console.log(time);
    active = getIsNightModeActiveFromStoreage().then(function toogleNight() {
        if (active) {
            nightModeElements("body");
            darkenImages();
            reinvertBackgroundImages();
        }
    });

    // if (time > startTime || time < endTime) {
    //     addNightModeSwitchToStorage(true);
    //     active = getIsNightModeActiveFromStoreage().then(function toogleNight() {
    //         if (active) {
    //             nightModeElements("body");
    //             darkenImages();
    //         }
    //     });
    // }
}

function nightModeElements(tagName) {
    var allElements = document.querySelectorAll(tagName);
    for (let index = 0; index < allElements.length; index++) {
        const element = allElements[index];
        var background = window.getComputedStyle(element, null).backgroundColor;
        console.log(background);
        if (background === "rgb(255, 255, 255)" || "rgba(0, 0, 0, 0)") {
            element.style.setProperty("background-color", "black", "important");
        }
        element.style.filter="invert(90%)"
    }
}

function getIsNightModeActiveFromStoreage() {
    // Read it using the storage API
    return new Promise((resolve) => {
        chrome.storage.sync.get(['night_time'], function(items) {
            console.log("Night Time is " + items.night_time);
            active = items.night_time;
            resolve();
        });
    });
}

function addNightModeSwitchToStorage(fontFamily) {
    chrome.storage.sync.set({'night_time': fontFamily}, function() {
        console.log('Settings saved');
      });
}

function darkenImages() {
    var imgs = document.getElementsByTagName("img");
    for (let index = 0; index < imgs.length; index++) {
        const img = imgs[index];
        img.style.filter = "brightness(80%) invert(110%)";
    }
}

function reinvertBackgroundImages(){
    var elements = document.getElementsByTagName("*");
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        if (element.style.backgroundImage !== '') {
            elements.style.filter = "invert(100%)";
        }   
    }
}