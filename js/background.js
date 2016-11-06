chrome.browserAction.onClicked.addListener(function (tab) {
    if (tab.url.indexOf('ocg.xpg.jp/deck/deck.fcgi?ListNo=') !== -1)
        executeScript(tab.id);
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    var url;
    if (info.linkUrl)
        url = info.linkUrl;
    else
        url = info.srcUrl;
    if (url.indexOf('ocg.xpg.jp/deck/deck.fcgi?ListNo=') !== -1)
        executeScript(tab.id);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == 'sendImage') {
        var imageUrl = request.imageUrl;
        var imageName = request.imageName
            sendResponse({
                data: 'Get image : ' + imageUrl + ', Name : ' + imageName
            });
        chrome.downloads.download({
            url: imageUrl,
            filename: 'Images\/' + imageName
        }, function (downloadId) {
            var ids = getOpeningIds();
            if (ids.indexOf(downloadId) >= 0) {
                return;
            }
            ids.push(downloadId);
            setOpeningIds(ids);
        });
    }
});

function getOpeningIds() {
    var ids = [];
    try {
        ids = JSON.parse(localStorage.openWhenComplete);
    } catch (e) {
        localStorage.openWhenComplete = JSON.stringify(ids);
    }
    return ids;
}

function setOpeningIds(ids) {
    localStorage.openWhenComplete = JSON.stringify(ids);
}

chrome.downloads.onChanged.addListener(function (delta) {
    if (!delta.state || (delta.state.current != 'complete'))
        return;
    var ids = getOpeningIds();
    if (ids.indexOf(delta.id) < 0)
        return;
    chrome.downloads.open(delta.id);
    ids.splice(ids.indexOf(delta.id), 1);
    setOpeningIds(ids);
});

function executeScript(id) {
    chrome.tabs.executeScript(id, {
        file: 'js/jquery-2.2.0.min.js'
    });
    chrome.tabs.executeScript(id, {
        file: 'js/FileSaver.min.js'
    });
    chrome.tabs.executeScript(id, {
        file: 'js/deck-downloader.js'
    });
}

chrome.contextMenus.create({
    id: 'downloadDeck',
    title: 'Download Deck',
    documentUrlPatterns: '*://ocg.xpg.jp/*',
    contexts: ['all']
});
