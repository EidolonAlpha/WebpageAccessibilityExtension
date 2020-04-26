var allDivElements = document.getElementsByTagName("div");
for (let index = 0; index < allDivElements.length; index++) {
    const element = allDivElements[index];
    const style = getComputedStyle(element);
    console.log(style);
}

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

function getTextPreferences(sytleSheetLocation) {
    return new Promise((resolve) => {
        apiRequest(sytleSheetLocation).then(function(cssFile) {
            if (cssFile != undefined) {
                console.log(cssFile);
                resolve();
            }
        });
    });
}