// initializes the contextmenu on installation.
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": "NoClick: Get a gist",
        "id": 'noClick',
        "contexts": ["link"],
    });
});

// the listener function, run when someone right clicks the extension's menu in contextmenu.
function contextClicked(info, tab) {
    if (info.menuItemId === "noClick") {
        if (!info.linkUrl) return;

        url = 'https://noclick.herokuapp.com/summarize';
        url += "?url=" + info.linkUrl + "&num=5";

        chrome.tabs.executeScript(tab.id, {
            file: "picoModal-3.0.0.min.js"
        }, () => {
            chrome.tabs.executeScript(tab.id, {
                file: "script.js"
            }, () => {
                chrome.tabs.sendMessage(tab.id, url);
            })
        })
    }
}

// calls the listener.
chrome.contextMenus.onClicked.addListener(contextClicked);