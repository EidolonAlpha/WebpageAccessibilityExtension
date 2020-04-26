chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    var apiRequest = new XMLHttpRequest()
    if (request.URL != null) {
        if (request.BODY != null) {
            console.log("POST");
            apiRequest.open('POST', request.URL, true)
        } else {
            console.log("GET");
            apiRequest.open('GET', request.URL, true)
        }

        console.log("sending request to " + request.URL);
        apiRequest.onload = function() {
            console.log("Response from api : " + this.response);
            var data = JSON.parse(this.response);
            if (apiRequest.status >= 200 && apiRequest.status < 400) {
                callback(data);
                return true;
            } else {
                console.log('error')
            }
        }
         
        if (request.BODY != null) {
            console.log("POST");
            apiRequest.send(JSON.stringify(request.BODY));
        } else {
            console.log("GET");
            apiRequest.send();
        }
        console.log("Send");
    }
    return true;
});