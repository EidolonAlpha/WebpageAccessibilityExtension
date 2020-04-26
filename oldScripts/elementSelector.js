chrome.runtime.onMessage.addListener(
    function(destination, sender, callback) {
        console.log("Test");
    });