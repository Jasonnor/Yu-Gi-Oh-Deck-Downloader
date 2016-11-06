chrome.browserAction.onClicked.addListener(function (tab) {
    if (tab.url.indexOf('ocg.xpg.jp/deck/deck.fcgi?ListNo=') !== -1)
        executeScript(tab.id);
});

chrome.contextMenus.create({
    id: 'downloadDeck',
    title: 'Download Deck',
    documentUrlPatterns: ['*://ocg.xpg.jp/*'],
    contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (tab.url.indexOf('ocg.xpg.jp/deck/deck.fcgi?ListNo=') !== -1)
        executeScript(tab.id);
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
