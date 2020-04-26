function apiRequest(url, body){
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({URL : url, BODY : body}, function (response) {
            resolve(response);
        });
    });
}