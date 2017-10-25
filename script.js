function displayModal(messages) {
    // Cleans up after itself.
    picoModal(formatModal(messages))
        .afterClose(modal => {
            modal.destroy();
        })
        .show();
}

function formatModal(messages) {
    var title = messages.title;
    var content = messages.content;

    var result = "<ul>\n";

    content.forEach(item => {
        result += "<li>" + item + "</li>"
    });

    result += "</ul>";

    return result;
}

function makeRequest(req) {
    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        displayModal(JSON.parse(this.responseText));
    }

    xhttp.onerror = function() {
        console.log("Error", this.status);
    }

    xhttp.open('GET', req);

    xhttp.send();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    makeRequest(message);
})